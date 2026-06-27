# MVP Scope

## Scope rule

The MVP is the smallest stable foundation that proves Beyond can work as a virtual broadcast studio.

Agents must not expand scope until MVP 0.1 is working and checked.

## MVP 0.1 must include

- Browser app shell.
- Studio runtime screen.
- Babylon.js scene.
- One starter virtual set.
- Set selector.
- Source manager.
- One local sample media source.
- Optional browser camera source if permission is available.
- No-source state.
- One named 3D screen target.
- Source replacement.
- Set replacement.
- Runtime diagnostics.
- OBS capture guide.
- Browser smoke check.

## MVP 0.1 must not include

- Full timeline editor.
- Cloud sync.
- Marketplace.
- NDI.
- DeckLink.
- GStreamer.
- Custom encoder.
- Electron packaging.
- Unreal integration.
- Godot integration.
- A-Frame integration.
- AI set generation.
- Fake draggable panels.
- Fake source devices.

## MVP user flow

1. Operator opens Beyond.
2. Operator sees the studio runtime.
3. Operator selects a set.
4. Operator selects a media source.
5. Media appears inside the 3D studio.
6. Operator switches source.
7. Operator switches set.
8. Operator captures output in OBS.

## MVP acceptance

MVP 0.1 is accepted only when the app can complete the user flow above without crashing and the checks are documented.

## Scope control

If a task does not directly support MVP 0.1, it belongs in the roadmap, not in the current implementation.
