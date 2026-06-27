import { z } from "zod";
import { sourceManifestSchema } from "./sourceManifestSchema";

const idSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "id must be URL-safe");

export const runtimeStatusSchema = z.object({
  studioState: z.enum(["booting", "ready", "degraded", "crashed"]),
  activeSetId: idSchema.optional(),
  activeSourceId: idSchema.optional(),
  fps: z.number().nonnegative().optional(),
  lastError: z.string().min(1).optional()
});

export const projectSchema = z.object({
  version: z.number().int().positive(),
  activeSetId: idSchema,
  sources: z.array(sourceManifestSchema),
  screenAssignments: z.record(idSchema, idSchema)
});

export type RuntimeStatusContract = z.infer<typeof runtimeStatusSchema>;
export type BeyondProject = z.infer<typeof projectSchema>;
