# Dependency Decisions

No agent may add packages casually. Every new package must be justified here before or in the same patch.

## Approved for foundation

- Vite: browser app foundation.
- React: operator interface.
- TypeScript: safer code and easier review.
- Babylon.js: the only approved 3D engine for the foundation.
- @babylonjs/loaders: GLB and GLTF loading.
- Zustand: small state layer.
- Zod: validate set and source manifests.
- Vitest: unit tests.
- Playwright: browser smoke tests and screenshots.
- ESLint: quality gate.
- Prettier: formatting.
- gltf-transform: 3D asset optimization.
- gltf-validator: 3D asset validation.

## Frozen until the foundation works

Do not add these yet:

- GStreamer.
- Direct libobs plugin work.
- DeckLink direct SDK work.
- NDI SDK work.
- Custom FFmpeg output pipeline.
- Electron packaging.
- Godot.
- Three.js.
- A-Frame.
- Unreal Engine.
- Framer Motion.
- Redux.

These tools may be useful later, but adding them before the first stable proof will increase confusion.

## Decision template

```md
### YYYY-MM-DD - package-name

- Problem:
- Existing alternative:
- Why needed now:
- Added cost:
- Test plan:
- Decision:
```

## Current decisions

### 2026-06-27 - Babylon.js

Approved as the single 3D foundation.

### 2026-06-27 - OBS capture output

Approved as the first output path. OBS should handle stream, record, and virtual camera in phase 1.

### 2026-06-27 - Advanced media frameworks

Frozen until the core can show a real source inside a replaceable 3D set and remain stable.
