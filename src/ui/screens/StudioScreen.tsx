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
    return "Preview Mode";
  }

  if (state === "crashed") {
    return "Needs Attention";
  }

  return "Starting";
}

function runtimeTone(state: StudioRuntimeState): "neutral" | "good" | "warn" | "bad" {
  if (state === "ready") {
    return "good";
  }

  if (state === "degraded") {
    return "warn";
  }

  if (state === "crashed") {
    return "bad";
  }

  return "neutral";
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
    return "Output Ready";
  }

  if (state === "degraded") {
    return "Preview Output";
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

  return (
    <main className="studio-screen" data-testid="studio-screen">
      <header className="studio-header">
        <div className="brand-lockup">
          <span className="brand-mark">B</span>
          <div>
            <p className="eyebrow">Beyond Studio</p>
            <h1>Beyond Studio</h1>
          </div>
        </div>
        <div className="header-metrics" aria-label="Studio status summary">
          <div>
            <span>Active set</span>
            <strong data-testid="active-set">{activeSetName}</strong>
          </div>
          <div>
            <span>Output</span>
            <strong>{outputLabel(diagnostics.studioState)}</strong>
          </div>
          <div>
            <span>Diagnostics</span>
            <strong>{runtimeDisplay}</strong>
          </div>
        </div>
        <div className="header-status">
          <StatusPill
            label={runtimeDisplay}
            tone={runtimeTone(diagnostics.studioState)}
            data-testid="runtime-status"
          />
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
              <p className="eyebrow">Sources</p>
              <h2 id="source-manager-heading" data-testid="active-source">
                {activeSourceName}
              </h2>
            </div>
            <ul className="option-list">
              {sourceRegistry.map((source) => (
                <li key={source.id} className="option-row">
                  <div>
                    <strong>{source.name}</strong>
                    <StatusPill label={source.message} tone={sourceTone(source.state)} />
                  </div>
                  {source.selectable ? (
                    <button
                      type="button"
                      className="small-action"
                      aria-pressed={source.id === activeSourceId}
                      onClick={() => setActiveSourceId(source.id)}
                    >
                      {source.id === activeSourceId ? "Active" : "Select"}
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
              <p className="eyebrow">Sets</p>
              <h2 id="set-selector-heading">Starter Studio</h2>
            </div>
            <div className="set-card">
              <img
                src="/sets/starter-studio/thumb-placeholder.svg"
                alt="Starter Studio placeholder thumbnail"
              />
              <div>
                <strong>{activeSetName}</strong>
                <span>Active</span>
                <StatusPill label={runtimeDisplay} tone={runtimeTone(diagnostics.studioState)} />
              </div>
            </div>
          </section>
        </aside>

        <section className="runtime-stage" aria-label="Studio program output">
          <div className="stage-toolbar">
            <div>
              <span>Studio Preview</span>
              <strong>{activeSetName}</strong>
            </div>
            <StatusPill
              label={outputLabel(diagnostics.studioState)}
              tone={runtimeTone(diagnostics.studioState)}
            />
          </div>
          <StudioCanvas activeSetId={activeSetId} activeSourceId={activeSourceId} />
        </section>

        <aside className="right-rail">
          <DiagnosticsPanel />
        </aside>
      </section>

      <footer className="status-strip" aria-label="Runtime summary">
        <span>
          Runtime <strong>{runtimeDisplay}</strong>
        </span>
        <span>
          FPS <strong>{diagnostics.fps ? Math.round(diagnostics.fps) : "..."}</strong>
        </span>
        <span>
          Source <strong>{activeSourceName}</strong>
        </span>
        <span>
          Set <strong>{activeSetName}</strong>
        </span>
      </footer>
    </main>
  );
}
