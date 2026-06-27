---
name: beyond-3d-engine
description: Use when implementing or reviewing Babylon.js 3D runtime, GLB/GLTF set loading, video textures, cameras, lights, and runtime diagnostics for Beyond.
---

# Beyond 3D Engine Skill

## Mission

Build and protect the stable 3D studio runtime.

## Required context

Read before working:

- `AGENTS.md`
- `docs/ARCHITECTURE.md`
- `docs/DEPENDENCY_DECISIONS.md`
- `docs/QUALITY_GATE.md`
- `docs/NO_FAKE_UI.md`

## Scope

This skill covers:

- Babylon.js engine setup.
- Scene lifecycle.
- GLB and GLTF loading.
- Named screen meshes.
- VideoTexture placement.
- Camera and lighting setup.
- Render loop stability.
- FPS/runtime diagnostics.
- Asset cleanup.

## Do

- Use Babylon.js as the only 3D engine.
- Load one set at a time for the foundation.
- Validate that required meshes exist.
- Dispose old scenes, textures, and media elements.
- Keep 3D runtime separate from React UI state.
- Show useful runtime errors in diagnostics.
- Keep the first scene simple and measurable.

## Do not

- Add Three.js, Godot, A-Frame, or Unreal.
- Add cinematic effects before stability.
- Load every set at startup.
- Recreate textures every frame.
- Hide missing mesh or missing asset problems.
- Use huge unoptimized models for the starter set.

## Acceptance criteria

A 3D runtime patch passes only when:

1. Scene renders.
2. Set loads.
3. Required screen mesh is found.
4. Video texture attaches to the mesh.
5. Source or set replacement does not break the scene.
6. The patch report lists checks and limitations.
