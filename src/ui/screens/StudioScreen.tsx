import { useAppStore } from "../../state/appStore";
import { DiagnosticsPanel } from "../../studio/diagnostics/DiagnosticsPanel";
import { useDiagnosticsStore } from "../../studio/diagnostics/diagnosticsStore";
import { StudioCanvas } from "../../studio/runtime/StudioCanvas";
import type { SourceState, StudioRuntimeState } from "../../studio/runtime/runtimeTypes";
import { setRegistry } from "../../studio/sets/setRegistry";
import { sourceRegistry } from "../../studio/sources/sourceRegistry";
import { StatusPill } from "../components/StatusPill";

function runtimeLabel(state: StudioRuntimeState): string {
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

function sourceTone(state: SourceState): "neutral" | "good" | "warn" | "bad" {
  if (state === "active") {
    return "good";
  }

  if (state === "error") {
    return "bad";
  }

  return "warn";
}

function outputLabel(state: StudioRuntimeState): string {
  if (state === "ready") {
    return "Studio Preview";
  }

  if (state === "degraded") {
    return "Studio Preview";
  }

  if (state === "crashed") {
    return "Output Offline";
  }

  return "Starting Output";
}

export function StudioScreen() {
  const activeSetId = useAppStore((state) => state.activeSetId);
  const activeSourceId = useAppStore((state) => state.activeSourceId);
  const setActiveSourceId = useAppStore((state) => state.setActiveSourceId);
  const goToHome = useAppStore((state) => state.goToHome);
  const diagnostics = useDiagnosticsStore();
  const activeSource = sourceRegistry.find((source) => source.id === activeSourceId);
  const activeSet = setRegistry.find((set) => set.id === activeSetId);
  const runtimeDisplay = runtimeLabel(diagnostics.studioState);
  const activeSetName = activeSet?.name ?? "Starter Studio";
  const activeSourceName = activeSource?.name ?? "No Source";
  const fpsDisplay = diagnostics.fps ? String(Math.round(diagnostics.fps)) : "...";

  return (
    <main className="studio-screen" data-testid="studio-screen">
      <header className="studio-header">
        <div className="brand-lockup">
          <span className="brand-mark">B</span>
          <div>
            <h1>Beyond Studio</h1>
            <p>Virtual Broadcast Foundation</p>
          </div>
        </div>
        <div className="header-status-line" aria-label="Studio status summary">
          <span>
            Set: <strong data-testid="active-set">{activeSetName}</strong>
          </span>
          <span>
            Output: <strong>{outputLabel(diagnostics.studioState)}</strong>
          </span>
          <span>
            FPS: <strong>{fpsDisplay}</strong>
          </span>
        </div>
        <div className="header-actions">
          <span className="obs-status">OBS: Not Checked</span>
          <button type="button" className="secondary-action" onClick={goToHome}>
            Home
          </button>
        </div>
      </header>

      <section className="studio-layout">
        <aside className="left-rail">
          <section
            className="panel source-panel"
            aria-labelledby="source-manager-heading"
            data-testid="source-manager"
          >
            <div className="panel-heading">
              <p className="eyebrow" id="source-manager-heading">
                Sources
              </p>
            </div>
            <ul className="option-list">
              {sourceRegistry.map((source) => (
                <li key={source.id} className="option-row">
                  <div className="source-row-main">
                    <strong
                      data-testid={source.id === activeSourceId ? "active-source" : undefined}
                    >
                      {source.name}
                    </strong>
                    {source.id === activeSourceId ? (
                      <StatusPill label="Active" tone="good" />
                    ) : (
                      <StatusPill label={source.message} tone={sourceTone(source.state)} />
                    )}
                  </div>
                  {source.selectable && source.id !== activeSourceId ? (
                    <button
                      type="button"
                      className="small-action"
                      aria-pressed={source.id === activeSourceId}
                      onClick={() => setActiveSourceId(source.id)}
                    >
                      Select
                    </button>
                  ) : (
                    <span className="source-action-spacer" aria-hidden="true" />
                  )}
                </li>
              ))}
            </ul>
          </section>

          <section
            className="panel set-panel"
            aria-labelledby="set-selector-heading"
            data-testid="set-selector"
          >
            <div className="panel-heading">
              <p className="eyebrow" id="set-selector-heading">
                Sets
              </p>
            </div>
            <div className="set-card">
              <img
                src="/sets/starter-studio/thumb-placeholder.svg"
                alt="Starter Studio placeholder thumbnail"
              />
              <div>
                <strong>{activeSetName}</strong>
                <span>Active</span>
              </div>
            </div>
          </section>
        </aside>

        <section className="runtime-stage" aria-label="Studio preview" data-testid="studio-preview">
          <div className="stage-toolbar">
            <div>
              <span>Studio Preview</span>
            </div>
          </div>
          <div className="preview-frame">
            <StudioCanvas activeSetId={activeSetId} activeSourceId={activeSourceId} />
          </div>
        </section>

        <aside className="right-rail">
          <DiagnosticsPanel />
        </aside>
      </section>

      <footer className="status-strip" aria-label="Runtime summary" data-testid="bottom-status">
        <span data-testid="runtime-status">
          Runtime: <strong>{runtimeDisplay}</strong>
        </span>
        <span>
          FPS: <strong>{fpsDisplay}</strong>
        </span>
        <span>
          Source: <strong>{activeSourceName}</strong>
        </span>
        <span>
          Set: <strong>{activeSetName}</strong>
        </span>
      </footer>
    </main>
  );
}
