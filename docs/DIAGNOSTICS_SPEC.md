# Diagnostics Specification

Diagnostics are part of the foundation. They help operators and agents see what is really working.

## Required diagnostics panel

The MVP diagnostics panel must show:

- Runtime state.
- Active set id.
- Active source id.
- Source state.
- FPS or render status.
- Set load status.
- Last error message.
- OBS check status as a manual note.

## Developer diagnostics

When development mode is active, include scene load time, number of meshes where available, number of active video textures, current canvas size, and browser name if available.

## Logging rules

- Do not spam logs every frame.
- Log state transitions.
- Log set load failures.
- Log source load failures.
- Log runtime crashes.
- Log dependency or asset validation failures.

## Diagnostics state shape

```ts
export type DiagnosticsState = {
  runtimeState: "booting" | "ready" | "degraded" | "crashed";
  activeSetId?: string;
  activeSourceId?: string;
  sourceState?: string;
  fps?: number;
  setLoadStatus?: string;
  lastError?: string;
  obsCheckStatus?: "not-checked" | "checked" | "failed";
};
```

## Acceptance

A runtime patch that changes source loading, set loading, or render behavior must update diagnostics where needed.
