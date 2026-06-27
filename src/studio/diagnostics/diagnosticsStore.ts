import { create } from "zustand";
import type { StudioRuntimeDiagnostics } from "../runtime/runtimeTypes";

export const initialDiagnostics: StudioRuntimeDiagnostics = {
  studioState: "booting",
  setState: "idle",
  sourceState: "unavailable",
  renderStatus: "Runtime has not started.",
  setLoadStatus: "No set loaded.",
  proceduralFallbackActive: false,
  obsCheckStatus: "not-checked"
};

type DiagnosticsStore = StudioRuntimeDiagnostics & {
  updateDiagnostics: (patch: Partial<StudioRuntimeDiagnostics>) => void;
  resetDiagnostics: () => void;
};

export const useDiagnosticsStore = create<DiagnosticsStore>((set) => ({
  ...initialDiagnostics,
  updateDiagnostics: (patch) => set(patch),
  resetDiagnostics: () => set(initialDiagnostics)
}));
