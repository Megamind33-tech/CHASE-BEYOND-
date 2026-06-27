import type { SourceManifest } from "../../schemas/sourceManifestSchema";

export const STUDIO_RUNTIME_STATES = ["booting", "ready", "degraded", "crashed"] as const;
export const SET_STATES = ["idle", "loading", "ready", "switching", "error"] as const;
export const SOURCE_STATES = [
  "unavailable",
  "loading",
  "active",
  "paused",
  "ended",
  "error"
] as const;
export const VIDEO_TEXTURE_STATES = ["attached", "not-attached", "error"] as const;

export type StudioRuntimeState = (typeof STUDIO_RUNTIME_STATES)[number];
export type SetState = (typeof SET_STATES)[number];
export type SourceState = (typeof SOURCE_STATES)[number];
export type VideoTextureState = (typeof VIDEO_TEXTURE_STATES)[number];

export type RuntimeStatus = {
  studioState: StudioRuntimeState;
  activeSetId?: string;
  activeSourceId?: string;
  fps?: number;
  lastError?: string;
};

export type SourceStatus = {
  id: string;
  state: SourceState;
  message?: string;
};

export type StudioRuntimeDiagnostics = RuntimeStatus & {
  setState: SetState;
  sourceState: SourceState;
  renderStatus: string;
  setLoadStatus: string;
  videoTextureStatus: VideoTextureState;
  proceduralFallbackActive: boolean;
  message?: string;
  screenMeshName?: string;
  meshCount?: number;
  canvasSize?: string;
  renderLoopCount?: number;
  obsCheckStatus: "not-checked" | "checked" | "failed";
};

export type StudioRuntimeHandle = {
  sceneHasScreenMain: () => boolean;
  dispose: () => void;
};

export type SourceRegistryEntry = SourceManifest & {
  state: SourceState;
  message: string;
  selectable: boolean;
};
