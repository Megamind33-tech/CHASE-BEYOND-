# Error Handling

Beyond must never fail silently. Operators need clear messages and recovery paths.

## Error principles

- Show the error in the UI.
- Keep the app usable when possible.
- Give a next action.
- Log enough detail for developers.
- Do not hide broken runtime behavior behind fake success.

## Required error cases

### Missing set manifest

Message: Set manifest not found. Check the set folder.

Recovery: choose another set or add the missing manifest.

### Invalid set manifest

Message: Set manifest is invalid. Check required fields.

Recovery: fix manifest and reload.

### Missing model file

Message: Set model file not found.

Recovery: confirm the model path in the manifest.

### Missing screen mesh

Message: Required screen mesh was not found in the model.

Recovery: fix mesh name in the model or manifest.

### Source failed to load

Message: Source could not be loaded.

Recovery: choose another source or check the media path.

### Camera unavailable

Message: Camera is unavailable or permission was not granted.

Recovery: choose sample media or allow camera access.

### WebGL unavailable

Message: 3D runtime cannot start because WebGL is unavailable.

Recovery: use a supported browser or device.

### OBS not checked

Message: OBS capture has not been checked for this build.

Recovery: follow `docs/OBS_OUTPUT_GUIDE.md`.

## Developer detail

The UI message should be simple. The diagnostics panel may show technical detail such as error name, file path, mesh name, or stack summary.

## Degraded mode

When the app can continue after an error, mark runtime state as degraded and show what is affected.

## Crash mode

When the app cannot continue, show a clear reload action and preserve the last known error if possible.
