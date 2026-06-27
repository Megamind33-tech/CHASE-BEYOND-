# CHASE BEYOND

Beyond is a lightweight virtual broadcast studio. The product goal is not to imitate OBS, vMix, Zero Density, Unreal, GStreamer, Godot, Three.js, and Babylon.js all at once. The first launchable foundation is narrow:

1. A stable 3D virtual set runtime.
2. A real video/camera source shown inside the 3D environment.
3. Replaceable sets and replaceable sources.
4. OBS-based output for recording, streaming, and virtual camera.
5. Proof for every claimed feature.

## Required reading for every AI agent

Before editing code, every agent must read and follow:

- `AGENTS.md`
- `docs/PRODUCT_REQUIREMENTS.md`
- `docs/MVP_SCOPE.md`
- `docs/ARCHITECTURE.md`
- `docs/FOLDER_STRUCTURE.md`
- `docs/SCHEMAS.md`
- `docs/RUNTIME_STATE_MACHINE.md`
- `docs/DEPENDENCY_DECISIONS.md`
- `docs/PERFORMANCE_BUDGET.md`
- `docs/ASSET_PIPELINE.md`
- `docs/OBS_OUTPUT_GUIDE.md`
- `docs/UI_CONTRACT.md`
- `docs/TESTING_STRATEGY.md`
- `docs/QUALITY_GATE.md`
- `docs/EVIDENCE_GATE.md`
- `docs/ERROR_HANDLING.md`
- `docs/DIAGNOSTICS_SPEC.md`
- `docs/NO_FAKE_UI.md`
- `docs/MODEL_ROUTING.md`
- `docs/AI_MODEL_STRATEGY.md`
- `docs/RESEARCH_NOTES.md`
- `docs/RESEARCH_BASIS.md`
- `docs/ROADMAP.md`
- `docs/ADR/0001-foundation-architecture.md`

Claude Code must also read `CLAUDE.md`.
Cursor must use the rules inside `.cursor/rules/`.

## Current engineering verdict

Build the MVP around:

- Vite
- React
- TypeScript
- Babylon.js
- OBS Browser Source or OBS window capture
- Playwright checks
- Vitest/unit tests

Do not add OBS plugin development, GStreamer, DeckLink, NDI, Electron, Unreal, Godot, A-Frame, or custom FFmpeg output until the foundation passes the gates.

## First product milestone

A patch is not successful until it proves:

- App opens.
- One 3D set loads.
- One video source appears on a screen/plane inside the 3D set.
- Source replacement works.
- Set replacement works.
- OBS can capture the output.
- The app can run for 30 minutes without crashing.

Working simple beats beautiful fake.
