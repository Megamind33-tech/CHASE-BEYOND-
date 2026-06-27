# Schema Contracts

All important runtime data must have a stable schema. Agents must not invent new manifest shapes in random patches.

## Set manifest

Every set folder must include `manifest.json`.

```ts
export type SetManifest = {
  id: string;
  name: string;
  version: number;
  model: string;
  thumbnail: string;
  screens: ScreenBinding[];
};
```

## Screen binding

```ts
export type ScreenBinding = {
  id: string;
  meshName: string;
  label?: string;
  defaultSourceId?: string;
};
```

## Source manifest

```ts
export type SourceManifest = {
  id: string;
  name: string;
  type: "sample-video" | "camera" | "none";
  url?: string;
  thumbnail?: string;
};
```

## Project file

```ts
export type BeyondProject = {
  version: number;
  activeSetId: string;
  sources: SourceManifest[];
  screenAssignments: Record<string, string>;
};
```

## Runtime status

```ts
export type RuntimeStatus = {
  studioState: "booting" | "ready" | "degraded" | "crashed";
  activeSetId?: string;
  activeSourceId?: string;
  fps?: number;
  lastError?: string;
};
```

## Source status

```ts
export type SourceStatus = {
  id: string;
  state: "unavailable" | "loading" | "active" | "paused" | "ended" | "error";
  message?: string;
};
```

## Validation rules

- `id` values must be stable and URL-safe.
- `model` must point to a GLB or GLTF file.
- `thumbnail` must point to a real image.
- Each screen binding must reference a mesh that exists in the model.
- A source assignment must reference an existing source.
- Missing or invalid manifest data must produce a visible error.

## Zod requirement

When implementation begins, create Zod schemas matching these contracts. Runtime code must validate manifests before loading assets.

## Change control

Schema changes require:

1. Update this file.
2. Update TypeScript types.
3. Update Zod schemas.
4. Update tests.
5. Update sample manifests.
