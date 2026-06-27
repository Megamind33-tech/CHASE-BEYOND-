# Performance Budget

Beyond has already suffered from sluggishness. Performance must be designed from the beginning.

## Foundation targets

| Area | Target |
|---|---|
| App first usable screen | under 3 seconds in development |
| Starter set load | under 5 seconds |
| Minimum FPS | 30 FPS |
| Preferred FPS | 60 FPS |
| Source switch | under 2 seconds for local/sample media |
| Set switch | under 5 seconds for starter sets |
| Stability run | 30 minutes without uncontrolled memory growth |

## Asset targets

| Asset | Foundation target |
|---|---|
| Starter GLB/GLTF | Keep small enough for quick load. Avoid heavy cinematic assets. |
| Texture size | Prefer 1K or 2K for MVP unless a higher size is justified. |
| Set count at startup | Load registry only. Do not load all sets at startup. |
| Sample media | Keep short and lightweight for tests. |

## Runtime rules

- Do not load every set at startup.
- Dispose old scenes, meshes, textures, and media elements.
- Avoid recreating video textures every frame.
- Avoid hidden render loops.
- Do not add visual effects until baseline FPS is stable.
- Keep diagnostics visible during development.

## What to measure

- App load time.
- Set load time.
- Source switch time.
- FPS.
- Runtime errors.
- Memory growth during stability runs where tooling allows.

## Performance report

For runtime changes, include:

- Device or environment used.
- Browser used.
- FPS result.
- Load-time observation.
- Known bottleneck.

## Failure rule

If a patch makes the app slower or less stable, do not hide it. Report the regression and either fix it or mark the patch as not ready.
