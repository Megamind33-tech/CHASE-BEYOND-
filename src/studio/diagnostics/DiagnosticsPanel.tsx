import { useDiagnosticsStore } from "./diagnosticsStore";
import { getSourceById } from "../sources/sourceRegistry";

function formatFps(fps?: number): string {
  return typeof fps === "number" ? String(Math.round(fps)) : "...";
}

function formatRuntime(state: string): string {
  if (state === "ready") {
    return "Ready";
  }

  if (state === "degraded") {
    return "Preview";
  }

  if (state === "crashed") {
    return "Needs Attention";
  }

  return "Starting";
}

function formatSource(sourceId?: string): string {
  if (!sourceId || sourceId === "none") {
    return "None";
  }

  return getSourceById(sourceId)?.name ?? sourceId;
}

function formatObsStatus(status: string): string {
  if (status === "not-checked") {
    return "Not Checked";
  }

  return status;
}

function formatVideoStatus(status: string): string {
  if (status === "attached") {
    return "Attached";
  }

  if (status === "error") {
    return "Error";
  }

  return "Not Attached";
}

export function DiagnosticsPanel() {
  const diagnostics = useDiagnosticsStore();
  const note = diagnostics.lastError ?? diagnostics.message ?? "No issues.";
  const runtime = formatRuntime(diagnostics.studioState);

  return (
    <section
      className="panel diagnostics-panel"
      aria-labelledby="diagnostics-heading"
      data-testid="diagnostics-panel"
    >
      <div className="panel-heading">
        <p className="eyebrow">Diagnostics</p>
        <h2 id="diagnostics-heading">Status</h2>
      </div>
      <dl className="diagnostics-grid">
        <div>
          <dt>Runtime</dt>
          <dd data-testid="runtime-state">{runtime}</dd>
        </div>
        <div>
          <dt>FPS</dt>
          <dd>{formatFps(diagnostics.fps)}</dd>
        </div>
        <div>
          <dt>Set</dt>
          <dd>Starter Studio</dd>
        </div>
        <div>
          <dt>Source</dt>
          <dd>{formatSource(diagnostics.activeSourceId)}</dd>
        </div>
        <div>
          <dt>Screen</dt>
          <dd>{diagnostics.screenMeshName ?? "Pending"}</dd>
        </div>
        <div>
          <dt>Video</dt>
          <dd data-testid="video-texture-status">
            {formatVideoStatus(diagnostics.videoTextureStatus)}
          </dd>
        </div>
        <div>
          <dt>OBS</dt>
          <dd>{formatObsStatus(diagnostics.obsCheckStatus)}</dd>
        </div>
      </dl>
      <span className="sr-only" data-testid="render-loop-count">
        {diagnostics.renderLoopCount ?? 0}
      </span>
      <p className="diagnostic-message" data-testid="diagnostics-message">
        <span>Note</span>
        {note}
      </p>
    </section>
  );
}
