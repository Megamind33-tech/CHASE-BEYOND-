import { z } from "zod";

const idSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "id must be URL-safe");

export const sourceManifestSchema = z.object({
  id: idSchema,
  name: z.string().min(1),
  type: z.enum(["sample-video", "camera", "none"]),
  url: z.string().min(1).optional(),
  thumbnail: z.string().min(1).optional()
});

export const sourceStatusSchema = z.object({
  id: idSchema,
  state: z.enum(["unavailable", "loading", "active", "paused", "ended", "error"]),
  message: z.string().min(1).optional()
});

export type SourceManifest = z.infer<typeof sourceManifestSchema>;
export type SourceStatusContract = z.infer<typeof sourceStatusSchema>;
