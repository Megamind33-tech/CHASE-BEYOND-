# Folder Structure

Agents must keep the repository organized. Do not place runtime, UI, schemas, tests, assets, and diagnostics randomly.

## Target structure

```text
src/
  app/
    App.tsx
    main.tsx
  ui/
    components/
    screens/
  studio/
    runtime/
    scene/
    sets/
    sources/
    diagnostics/
  state/
  schemas/
  tests/
public/
  sets/
    starter-studio/
      manifest.json
      studio.glb
      thumb.jpg
  media/
    sample-video.mp4
docs/
evidence/
```

## Directory duties

### `src/app/`

App entry and application wiring only.

### `src/ui/`

React UI components and screens. UI must call runtime APIs. UI must not own render-loop logic.

### `src/studio/runtime/`

Babylon engine, scene lifecycle, canvas binding, resizing, and disposal.

### `src/studio/scene/`

Scene creation helpers, cameras, lights, mesh lookup, material setup, and video texture attachment.

### `src/studio/sets/`

Set manifest loading, set validation, set switching, and set registry.

### `src/studio/sources/`

Source registry, media element lifecycle, source switching, and source status.

### `src/studio/diagnostics/`

FPS, runtime status, source status, scene load time, and last error reporting.

### `src/state/`

Small app state stores. Keep state explicit and easy to inspect.

### `src/schemas/`

Zod or TypeScript schema definitions for manifests and project files.

### `public/sets/`

Static set folders. Every set folder must contain a manifest and thumbnail.

### `public/media/`

Sample media for local development only. Sample media must never be described as live production input.

### `evidence/`

Screenshots, recordings, run notes, and check logs.

## Rules

- Do not create duplicate runtime folders.
- Do not mix UI components with engine lifecycle code.
- Do not place production logic in test folders.
- Do not place sample assets inside `src/`.
- Do not create new top-level folders unless the reason is documented.
