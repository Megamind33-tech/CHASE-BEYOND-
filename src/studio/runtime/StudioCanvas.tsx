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

    void createStudioRuntime({ canvas, activeSetId, activeSourceId })
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
