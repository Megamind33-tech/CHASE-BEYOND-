import { useAppStore } from "../../state/appStore";
import { DiagnosticsPanel } from "../../studio/diagnostics/DiagnosticsPanel";
import { useDiagnosticsStore } from "../../studio/diagnostics/diagnosticsStore";
import { StudioCanvas } from "../../studio/runtime/StudioCanvas";
import type { SourceState, StudioRuntimeState } from "../../studio/runtime/runtimeTypes";
import { setRegistry } from "../../studio/sets/setRegistry";
import { sourceRegistry } from "../../studio/sources/sourceRegistry";
import { StatusPill } from "../components/StatusPill";

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

export function StudioScreen() {
  const activeSetId = useAppStore((state) => state.activeSetId);
  const activeSourceId = useAppStore((state) => state.activeSourceId);
  const setActiveSourceId = useAppStore((state) => state.setActiveSourceId);
  const goToHome = useAppStore((state) => state.goToHome);
  const diagnostics = useDiagnosticsStore();
  const activeSource = sourceRegistry.find((source) => source.id === activeSourceId);

  return (
    <main className="studio-screen" data-testid="studio-screen">
      <header className="studio-header">
        <div>
          <p className="eyebrow">Studio runtime</p>
          <h1>Development Starter Set</h1>
        </div>
        <div className="header-status">
          <StatusPill label={diagnostics.studioState} tone={runtimeTone(diagnostics.studioState)} />
          <button type="button" className="secondary-action" onClick={goToHome}>
            Home
          </button>
        </div>
      </header>

      <section className="studio-layout">
        <aside className="left-rail">
          <section className="panel" aria-labelledby="source-manager-heading">
            <div className="panel-heading">
              <p className="eyebrow">Source Manager</p>
              <h2 id="source-manager-heading">Active source</h2>
            </div>
            <div className="active-summary">
              <strong>{activeSource?.name ?? "Unknown source"}</strong>
              <StatusPill
                label={diagnostics.sourceState}
                tone={sourceTone(diagnostics.sourceState)}
              />
            </div>
            <p className="panel-copy">{activeSource?.message ?? "Source could not be resolved."}</p>
            <ul className="option-list">
              {sourceRegistry.map((source) => (
                <li key={source.id} className="option-row">
                  <div>
                    <strong>{source.name}</strong>
                    <span>{source.message}</span>
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
                    <StatusPill label={source.state} tone={sourceTone(source.state)} />
                  )}
                </li>
              ))}
            </ul>
          </section>

          <section className="panel" aria-labelledby="set-selector-heading">
            <div className="panel-heading">
              <p className="eyebrow">Set Selector</p>
              <h2 id="set-selector-heading">Active set</h2>
            </div>
            <div className="set-card">
              <img
                src="/sets/starter-studio/thumb-placeholder.svg"
                alt="Development Starter Set placeholder thumbnail"
              />
              <div>
                <strong>{setRegistry[0]?.name ?? "No set registered"}</strong>
                <span>ID: {activeSetId}</span>
                <StatusPill
                  label={diagnostics.setState}
                  tone={runtimeTone(diagnostics.studioState)}
                />
              </div>
            </div>
            <p className="panel-copy" data-testid="fallback-copy">
              {diagnostics.proceduralFallbackActive
                ? diagnostics.message
                : "The starter set manifest is loading."}
            </p>
          </section>
        </aside>

        <section className="runtime-stage" aria-label="Studio program output">
          <div className="stage-toolbar">
            <span>Program output</span>
            <span>{diagnostics.renderStatus}</span>
          </div>
          <StudioCanvas activeSetId={activeSetId} activeSourceId={activeSourceId} />
        </section>

        <aside className="right-rail">
          <DiagnosticsPanel />
        </aside>
      </section>
    </main>
  );
}
