# Architecture Direction

## Verdict

Beyond starts as a lightweight virtual broadcast foundation, not a full OBS replacement.

```text
Media source
  -> Source Manager
  -> Babylon.js 3D Runtime
  -> Virtual set meshes and video textures
  -> Preview/Program UI
  -> OBS Browser Source or OBS window capture
  -> Stream, record, or virtual camera through OBS
```

## Reason

The project has been failing because too many engines and media layers were mixed before the core was stable. The correct approach is separation:

- Babylon.js renders the 3D studio.
- Source Manager controls media inputs.
- Operator UI controls sets, sources, preview, program, and diagnostics.
- OBS handles output.

## Core modules

### Studio Runtime

Responsible for:

- Creating the Babylon engine and scene.
- Loading GLB or GLTF studio sets.
- Detecting named screen meshes.
- Attaching video textures to target meshes.
- Managing camera, lights, render loop, resize, and diagnostics.

Not responsible for:

- Encoding.
- Direct capture-card integration.
- Full broadcast switching.
- UI state ownership.

### Source Manager

Responsible for:

- Registering sources.
- Loading file, browser, and camera sources supported by the foundation.
- Reporting source state.
- Replacing sources safely.
- Disposing old video elements and textures.

Source states:

- unavailable
- loading
- active
- paused
- ended
- error

### Set Manager

Responsible for:

- Loading set manifests.
- Showing real thumbnails.
- Validating required assets.
- Switching between set folders.
- Keeping source assignments stable where possible.

Required manifest shape:

```json
{
  "id": "starter-studio",
  "name": "Starter Studio",
  "version": 1,
  "model": "/sets/starter-studio/studio.glb",
  "thumbnail": "/sets/starter-studio/thumb.jpg",
  "screens": [
    {
      "id": "main-screen",
      "meshName": "Screen_Main",
      "defaultSourceId": "sample-video"
    }
  ]
}
```

### Operator UI

Responsible for:

- Source list.
- Set list.
- Preview/program surface.
- Diagnostics.
- Real controls only.

The UI must not contain unsupported fake controls.

### Output Bridge

Phase 1 output is through OBS capture:

- OBS Browser Source pointing to the local app URL; or
- OBS window capture of the Beyond runtime.

Direct plugin work is phase 2 or later.

## Standards

- TypeScript strict mode.
- Config validation.
- No untyped set or source manifests.
- No dependency added without a decision record.
- No render-loop logic scattered through React components.
- No loading all sets at startup.
- Dispose old scenes, meshes, textures, and media elements.
- Display FPS during development.

## First milestone

A successful first implementation proves:

1. App opens.
2. Babylon scene renders.
3. GLB or GLTF set loads.
4. Video texture appears on a named mesh.
5. Source can be replaced.
6. Set can be replaced.
7. OBS captures the result.
8. 30-minute stability test passes.
