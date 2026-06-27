import { describe, expect, it } from "vitest";
import { projectSchema, runtimeStatusSchema } from "../schemas/projectSchema";
import { screenBindingSchema, setManifestSchema } from "../schemas/setManifestSchema";
import { sourceManifestSchema, sourceStatusSchema } from "../schemas/sourceManifestSchema";

describe("schema contracts", () => {
  it("accepts a valid starter set manifest", () => {
    const result = setManifestSchema.safeParse({
      id: "starter-studio",
      name: "Development Starter Set",
      version: 1,
      model: "/sets/starter-studio/studio.glb",
      thumbnail: "/sets/starter-studio/thumb-placeholder.svg",
      screens: [
        {
          id: "main-screen",
          meshName: "Screen_Main",
          label: "Main development screen",
          defaultSourceId: "none"
        }
      ]
    });

    expect(result.success).toBe(true);
  });

  it("rejects invalid set manifest model paths", () => {
    const result = setManifestSchema.safeParse({
      id: "starter-studio",
      name: "Development Starter Set",
      version: 1,
      model: "/sets/starter-studio/studio.obj",
      thumbnail: "/sets/starter-studio/thumb-placeholder.svg",
      screens: [{ id: "main-screen", meshName: "Screen_Main" }]
    });

    expect(result.success).toBe(false);
  });

  it("accepts screen bindings and source manifests", () => {
    expect(screenBindingSchema.parse({ id: "main-screen", meshName: "Screen_Main" })).toEqual({
      id: "main-screen",
      meshName: "Screen_Main"
    });

    expect(
      sourceManifestSchema.parse({
        id: "sample-video",
        name: "Sample video",
        type: "sample-video",
        url: "/media/sample-video.mp4"
      })
    ).toMatchObject({ id: "sample-video", type: "sample-video" });
  });

  it("rejects fake source types", () => {
    const result = sourceManifestSchema.safeParse({
      id: "fake-source",
      name: "Fake source",
      type: "ndi"
    });

    expect(result.success).toBe(false);
  });

  it("accepts project, runtime, and source status contracts", () => {
    expect(
      projectSchema.parse({
        version: 1,
        activeSetId: "starter-studio",
        sources: [{ id: "none", name: "No source", type: "none" }],
        screenAssignments: { "main-screen": "none" }
      })
    ).toMatchObject({ activeSetId: "starter-studio" });

    expect(
      runtimeStatusSchema.parse({
        studioState: "degraded",
        activeSetId: "starter-studio",
        activeSourceId: "none",
        fps: 60
      })
    ).toMatchObject({ studioState: "degraded" });

    expect(sourceStatusSchema.parse({ id: "none", state: "unavailable" })).toEqual({
      id: "none",
      state: "unavailable"
    });
  });
});
