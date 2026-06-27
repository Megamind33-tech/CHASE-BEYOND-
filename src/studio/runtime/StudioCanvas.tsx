import { useEffect, useRef } from "react";
import { createStudioRuntime } from "./createStudioRuntime";
import type { StudioRuntimeHandle } from "./runtimeTypes";

type StudioCanvasProps = {
  activeSetId: string;
  activeSourceId: string;
};

export function StudioCanvas({ activeSetId, activeSourceId }: StudioCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return undefined;
    }

    let cancelled = false;
    let runtime: StudioRuntimeHandle | undefined;
    const abortController = new AbortController();

    void createStudioRuntime({
      canvas,
      activeSetId,
      activeSourceId,
      signal: abortController.signal
    })
      .then((handle) => {
        if (cancelled) {
          handle.dispose();
          return;
        }

        runtime = handle;
      })
      .catch(() => undefined);

    return () => {
      cancelled = true;
      abortController.abort();
      runtime?.dispose();
    };
  }, [activeSetId, activeSourceId]);

  return (
    <canvas
      ref={canvasRef}
      className="studio-canvas"
      data-testid="studio-canvas"
      aria-label="Babylon.js studio runtime canvas"
    />
  );
}
