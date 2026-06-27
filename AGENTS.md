# AGENTS.md - Universal Rules for Beyond

These instructions apply to every AI agent, coding model, human reviewer, and automated tool working in this repository.

## Product identity

Beyond is a lightweight virtual broadcast studio. It must become a useful broadcasting tool, not a mockup dashboard.

The first stable foundation is:

- Babylon.js 3D virtual set runtime.
- Real video, camera, or file source rendered inside the 3D environment.
- Replaceable 3D environments.
- Replaceable video sources.
- OBS-based output for recording, streaming, and virtual camera.
- Proof for every feature claim.

## Non-negotiable engineering principle

Do not build the dream stack before the core works. The first foundation must stay narrow, testable, and measurable.

## Current approved MVP stack

Approved for the foundation:

- Vite
- React
- TypeScript
- Babylon.js
- @babylonjs/loaders
- Zustand or a similarly small state layer
- Zod for config validation
- Vitest
- Playwright
- OBS Browser Source or OBS window capture for output
- Optimized glTF or GLB assets

## Frozen until the quality gate passes

Do not add these until the MVP core passes a 30-minute stability test and the decision is documented in `docs/DEPENDENCY_DECISIONS.md`:

- GStreamer
- Direct libobs plugin work
- DeckLink direct SDK integration
- NDI SDK integration
- Custom FFmpeg output pipeline
- Electron desktop packaging
- Godot
- Three.js
- A-Frame
- Unreal Engine
- AR tracking
- AI-generated set builder
- Marketplace
- Cloud collaboration
- Complex timeline editor

## Required reading before editing

Before any code change, read:

1. `docs/PRODUCT_REQUIREMENTS.md`
2. `docs/MVP_SCOPE.md`
3. `docs/ARCHITECTURE.md`
4. `docs/FOLDER_STRUCTURE.md`
5. `docs/SCHEMAS.md`
6. `docs/RUNTIME_STATE_MACHINE.md`
7. `docs/DEPENDENCY_DECISIONS.md`
8. `docs/PERFORMANCE_BUDGET.md`
9. `docs/ASSET_PIPELINE.md`
10. `docs/OBS_OUTPUT_GUIDE.md`
11. `docs/UI_CONTRACT.md`
12. `docs/TESTING_STRATEGY.md`
13. `docs/QUALITY_GATE.md`
14. `docs/ERROR_HANDLING.md`
15. `docs/DIAGNOSTICS_SPEC.md`
16. `docs/NO_FAKE_UI.md`
17. `docs/MODEL_ROUTING.md`
18. `docs/RESEARCH_NOTES.md`
19. `docs/ROADMAP.md`
20. `docs/ADR/0001-foundation-architecture.md`

## Reasoning order

Before changing files, every agent must:

1. Identify the exact business goal.
2. Identify the smallest technical change needed.
3. Read the relevant existing files.
4. Check the frozen-dependency list.
5. Make the smallest safe patch.
6. Run available verification.
7. Report proof and limitations.

## Accuracy rules

- Do not invent files, functions, APIs, or dependencies.
- Do not claim a feature works unless it has proof.
- Do not create fake source lists, fake sets, fake buttons, fake uploads, or fake diagnostics.
- Do not mark mock surfaces as complete.
- Do not add packages without updating `docs/DEPENDENCY_DECISIONS.md`.
- Do not remove tests just to make a build pass.
- Do not mask real failures without reporting degraded mode in the UI.

## Required patch report

Every AI patch must end with:

```md
## Patch Report

### Goal

### Files changed

### What now works

### Checks
- Typecheck:
- Tests:
- Build:
- Screenshot/video:
- Manual test:

### Known limitations

### Dependencies added or removed

### Next safe step
```

## Merge blockers

A patch must not be accepted if:

- App does not open.
- Main screen is blank.
- 3D scene fails to load.
- Video source is frozen or fake.
- Controls do not perform real actions.
- Source switching breaks.
- Set switching breaks.
- It adds frozen dependencies without an architecture decision.
- It gives no proof.
- It replaces actual implementation with mock UI.

## Definition of done for the foundation

The foundation is done only when:

1. The app opens reliably.
2. A Babylon.js scene renders.
3. A GLB or GLTF studio set loads.
4. A real video source appears on a named mesh.
5. Source replacement works.
6. Set replacement works.
7. OBS can capture the output.
8. The app can run for 30 minutes without crashing.
9. Screenshots or recordings exist as proof.
10. Tests and build pass.

Working simple beats beautiful fake.
