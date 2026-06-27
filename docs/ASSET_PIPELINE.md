# Asset Pipeline

Bad assets can destroy a 3D broadcast app even when the code is correct. Every set and media asset must follow a simple pipeline.

## Accepted 3D formats

- GLB is preferred.
- GLTF is allowed when external files are organized correctly.
- Random model formats are not accepted for the foundation.

## Required set folder

```text
public/sets/set-id/
  manifest.json
  studio.glb
  thumb.jpg
```

## Required manifest fields

Each set must declare id, name, version, model path, thumbnail path, and screen bindings.

## Mesh naming

Every screen target must use a stable mesh name. Examples:

- `Screen_Main`
- `Screen_Left`
- `Screen_Right`

The manifest must reference the exact mesh name.

## Rejection rules

Fix a set before use when the manifest, model, thumbnail, or required screen mesh is missing. Also fix the set when textures are unnecessarily huge, FPS is poor, or the set requires features outside MVP scope.

## Optimization rules

- Remove unused meshes.
- Remove unused materials.
- Compress textures where practical.
- Keep the starter set lightweight.
- Avoid cinematic models until runtime is proven.
- Do not load all set models at startup.

## Validation tools

Use glTF validation and optimization tools once project scripts are added. Document the command output when asset changes are made.

## Thumbnails

Every set must have a real thumbnail. Demo thumbnails must be clearly named as demo.

## Sample media

Sample media is only for development and smoke checks. It must not be described as a live feed.
