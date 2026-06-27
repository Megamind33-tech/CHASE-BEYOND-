import { useDiagnosticsStore } from "./diagnosticsStore";

function formatFps(fps?: number): string {
  return typeof fps === "number" ? `${Math.round(fps)} FPS` : "Waiting for render loop";
}

export function DiagnosticsPanel() {
  const diagnostics = useDiagnosticsStore();
  const issue = diagnostics.lastError ?? diagnostics.message ?? "No runtime issue reported.";

  return (
    <section className="panel diagnostics-panel" aria-labelledby="diagnostics-heading">
      <div className="panel-heading">
        <p className="eyebrow">Diagnostics</p>
        <h2 id="diagnostics-heading">Runtime health</h2>
      </div>
      <dl className="diagnostics-grid">
        <div>
          <dt>Runtime state</dt>
          <dd data-testid="runtime-state">{diagnostics.studioState}</dd>
        </div>
        <div>
          <dt>Active set id</dt>
          <dd>{diagnostics.activeSetId ?? "none"}</dd>
        </div>
        <div>
          <dt>Active source id</dt>
          <dd>{diagnostics.activeSourceId ?? "none"}</dd>
        </div>
        <div>
          <dt>Source state</dt>
          <dd>{diagnostics.sourceState}</dd>
        </div>
        <div>
          <dt>Render status</dt>
          <dd>{formatFps(diagnostics.fps)}</dd>
        </div>
        <div>
          <dt>Set load status</dt>
          <dd>{diagnostics.setLoadStatus}</dd>
        </div>
        <div>
          <dt>Procedural fallback</dt>
          <dd data-testid="procedural-fallback">
            {diagnostics.proceduralFallbackActive ? "active" : "inactive"}
          </dd>
        </div>
        <div>
          <dt>OBS check</dt>
          <dd>{diagnostics.obsCheckStatus}</dd>
        </div>
        <div>
          <dt>Screen mesh</dt>
          <dd>{diagnostics.screenMeshName ?? "pending"}</dd>
        </div>
        <div>
          <dt>Canvas</dt>
          <dd>{diagnostics.canvasSize ?? "pending"}</dd>
        </div>
      </dl>
      <p className="diagnostic-message" data-testid="diagnostics-message">
        {issue}
      </p>
    </section>
  );
}
