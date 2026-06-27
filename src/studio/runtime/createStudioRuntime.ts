import { Engine, Scene } from "@babylonjs/core";
import { ZodError } from "zod";
import { useDiagnosticsStore } from "../diagnostics/diagnosticsStore";
import { createStarterScene } from "../scene/createStarterScene";
import { findScreenMesh } from "../scene/screenBinding";
import { loadSetManifest } from "../sets/setLoader";
import { getSourceById } from "../sources/sourceRegistry";
import type { SourceState, StudioRuntimeHandle } from "./runtimeTypes";

type CreateStudioRuntimeOptions = {
  canvas: HTMLCanvasElement;
  activeSetId: string;
  activeSourceId: string;
};

function getFriendlyError(error: unknown): string {
  if (error instanceof ZodError) {
    return "Set manifest is invalid. Check required fields.";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Runtime failed to start.";
}

function getCanvasSize(canvas: HTMLCanvasElement): string {
  return `${canvas.width}x${canvas.height}`;
}

export async function createStudioRuntime({
  canvas,
  activeSetId,
  activeSourceId
}: CreateStudioRuntimeOptions): Promise<StudioRuntimeHandle> {
  const updateDiagnostics = useDiagnosticsStore.getState().updateDiagnostics;
  const source = getSourceById(activeSourceId);
  const sourceState: SourceState = source?.state ?? "error";
  let engine: Engine | undefined;
  let scene: Scene | undefined;
  let disposed = false;
  let screenMainFound = false;

  try {
    updateDiagnostics({
      studioState: "booting",
      setState: "loading",
      sourceState,
      activeSetId,
      activeSourceId,
      renderStatus: "Starting Babylon.js runtime.",
      setLoadStatus: "Loading set manifest.",
      lastError: undefined,
      message: source?.message
    });

    engine = new Engine(canvas, true, {
      preserveDrawingBuffer: true,
      stencil: true,
      antialias: true
    });
    const loadedSet = await loadSetManifest(activeSetId);

    if (disposed) {
      engine.dispose();
      return {
        sceneHasScreenMain: () => false,
        dispose: () => undefined
      };
    }

    scene = new Scene(engine);
    const starterScene = createStarterScene(scene, canvas);
    const screenBinding = loadedSet.manifest.screens[0];
    const screenMesh = findScreenMesh(starterScene.scene, screenBinding);
    screenMainFound = Boolean(screenMesh);

    if (!screenMesh) {
      throw new Error("Required screen mesh was not found in the model.");
    }

    updateDiagnostics({
      studioState: loadedSet.proceduralFallbackActive ? "degraded" : "ready",
      setState: "ready",
      sourceState,
      activeSetId: loadedSet.manifest.id,
      activeSourceId,
      renderStatus: "Render loop running.",
      setLoadStatus: loadedSet.proceduralFallbackActive
        ? "Procedural starter set loaded."
        : "Set model loaded.",
      proceduralFallbackActive: loadedSet.proceduralFallbackActive,
      message: loadedSet.message ?? source?.message,
      screenMeshName: screenMesh.name,
      meshCount: starterScene.scene.meshes.length,
      canvasSize: getCanvasSize(canvas)
    });

    let lastFpsUpdate = performance.now();
    engine.runRenderLoop(() => {
      if (!scene || disposed) {
        return;
      }

      scene.render();
      const now = performance.now();

      if (now - lastFpsUpdate > 750) {
        lastFpsUpdate = now;
        updateDiagnostics({
          fps: engine?.getFps(),
          canvasSize: getCanvasSize(canvas),
          renderStatus: "Render loop running."
        });
      }
    });

    const handleResize = () => {
      engine?.resize();
      updateDiagnostics({ canvasSize: getCanvasSize(canvas) });
    };
    window.addEventListener("resize", handleResize);

    return {
      sceneHasScreenMain: () => screenMainFound,
      dispose: () => {
        disposed = true;
        window.removeEventListener("resize", handleResize);
        scene?.dispose();
        engine?.dispose();
      }
    };
  } catch (error) {
    const friendlyError = getFriendlyError(error);
    scene?.dispose();
    engine?.dispose();
    updateDiagnostics({
      studioState: "crashed",
      setState: "error",
      sourceState,
      activeSetId,
      activeSourceId,
      renderStatus: "Runtime stopped.",
      setLoadStatus: "Set load failed.",
      lastError: friendlyError,
      message: friendlyError
    });
    throw error;
  }
}
