# Runtime State Machine

Beyond must behave predictably. Sources, sets, and the studio runtime must move through known states.

## Studio runtime states

```text
booting -> ready -> degraded -> crashed
```

### booting

The runtime is creating the Babylon engine, canvas, and initial scene.

### ready

The scene is rendering and core controls are available.

### degraded

The app is still usable, but something failed. Example: set thumbnail missing, camera permission denied, sample source unavailable.

### crashed

The runtime cannot continue. The UI must show a clear recovery action.

## Set states

```text
idle -> loading -> ready -> switching -> error
```

### idle

No set has been selected.

### loading

A set manifest or model is being loaded.

### ready

The set is loaded and required screen meshes are available.

### switching

The current set is being disposed and a new set is being loaded.

### error

Set loading failed or required meshes are missing.

## Source states

```text
unavailable -> loading -> active -> paused
unavailable -> loading -> error
active -> ended
active -> error
```

### unavailable

The source is known but not ready.

### loading

The app is creating or loading the source.

### active

The source is playing or live and available for a video texture.

### paused

The source exists but is not currently playing.

### ended

A file source reached the end.

### error

The source failed. The UI must show why.

## Transitions must be explicit

Agents must not change state with random booleans like `isReady`, `hasLoaded`, and `failed` spread across the app. Use a single state value plus a message where needed.

## Operator messages

Every error state must produce an operator-friendly message. Example:

- Set model missing.
- Required screen mesh not found.
- Source failed to load.
- Camera permission unavailable.
- Runtime failed to start.

## Recovery rules

- Source error should allow choosing another source.
- Set error should allow choosing another set.
- Runtime crash should show reload guidance.
- A degraded state must not be hidden.
