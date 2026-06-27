import { create } from "zustand";
import type { StudioRuntimeDiagnostics } from "../runtime/runtimeTypes";

export const initialDiagnostics: StudioRuntimeDiagnostics = {
  studioState: "booting",
  setState: "idle",
  sourceState: "unavailable",
  renderStatus: "Runtime has not started.",
  setLoadStatus: "No set loaded.",
  videoTextureStatus: "not-attached",
  proceduralFallbackActive: false,
  renderLoopCount: 0,
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
