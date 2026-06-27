# Audit Checklist

Use this checklist when reviewing any Beyond patch.

## Product direction

- [ ] Does the work support Beyond as a virtual broadcast studio?
- [ ] Does it avoid looking like a generic dashboard?
- [ ] Does it avoid developer-only language in the operator UI?
- [ ] Does it avoid fake production claims?

## MVP scope

- [ ] Does the work support MVP 0.1?
- [ ] Does it avoid later-phase features?
- [ ] Does it avoid adding timeline, cloud, marketplace, AI generation, backend, or auth?
- [ ] Does it avoid fake preview/program switching?

## Architecture

- [ ] Uses Babylon.js as the only 3D engine.
- [ ] Does not add Three.js, Godot, A-Frame, or Unreal.
- [ ] Keeps OBS as phase 1 output path.
- [ ] Does not add GStreamer, NDI, DeckLink, or custom FFmpeg output.
- [ ] Does not add Electron before web runtime is proven.
- [ ] Follows the folder structure.

## Dependencies

- [ ] No unapproved dependency added.
- [ ] Any dependency change is documented in `docs/DEPENDENCY_DECISIONS.md`.
- [ ] No UI framework added without approval.

## Runtime

- [ ] App opens.
- [ ] Babylon canvas renders.
- [ ] Starter Studio appears.
- [ ] `Screen_Main` exists.
- [ ] Sample Video appears in source list.
- [ ] Sample Video attaches to `Screen_Main` when active.
- [ ] Diagnostics show video attached or honest failure.
- [ ] Source switching does not fake success.
- [ ] No duplicate render-loop risk is visible.

## UI and UX

- [ ] Center studio preview is dominant.
- [ ] Sources are compact.
- [ ] Sets are compact.
- [ ] Diagnostics are compact.
- [ ] No long explanation text in the operator UI.
- [ ] No repeated status labels everywhere.
- [ ] No fake buttons.
- [ ] No unavailable feature is presented as working.

## Evidence

- [ ] Patch report exists.
- [ ] Typecheck result is reported.
- [ ] Tests result is reported.
- [ ] Build result is reported.
- [ ] Smoke test result is reported.
- [ ] Screenshot or recording exists for visual/runtime changes.
- [ ] OBS status is honest.
- [ ] Evidence folder or notes exist where required.

## Performance

- [ ] FPS is recorded.
- [ ] FPS meets minimum target or issue is reported.
- [ ] No unnecessary effects or heavy assets added.
- [ ] No huge assets committed.
- [ ] Performance regression is not hidden.

## Asset integrity

- [ ] Public assets are documented.
- [ ] Licenses are recorded.
- [ ] Attribution requirements are respected.
- [ ] Sample assets are not described as production assets.

## Final audit judgment

Choose one:

- Pass.
- Pass with limitations.
- Needs changes.
- Blocked.
