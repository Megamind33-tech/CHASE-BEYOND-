import { z } from "zod";

const idSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "id must be URL-safe");

export const screenBindingSchema = z.object({
  id: idSchema,
  meshName: z.string().min(1),
  label: z.string().min(1).optional(),
  defaultSourceId: idSchema.optional()
});

export const setManifestSchema = z.object({
  id: idSchema,
  name: z.string().min(1),
  version: z.number().int().positive(),
  model: z.string().regex(/\.(glb|gltf)$/i, "model must point to a GLB or GLTF file"),
  thumbnail: z.string().regex(/\.(svg|png|jpg|jpeg|webp)$/i, "thumbnail must point to an image"),
  screens: z.array(screenBindingSchema).min(1)
});

export type ScreenBinding = z.infer<typeof screenBindingSchema>;
export type SetManifest = z.infer<typeof setManifestSchema>;
