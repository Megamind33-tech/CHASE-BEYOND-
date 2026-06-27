import { setManifestSchema, type SetManifest } from "../../schemas/setManifestSchema";
import { setRegistry, type SetRegistryEntry } from "./setRegistry";

export const proceduralFallbackMessage =
  "Using development procedural starter set because studio.glb is not present.";

export type LoadedSetManifest = {
  manifest: SetManifest;
  entry: SetRegistryEntry;
  modelAvailable: boolean;
  proceduralFallbackActive: boolean;
  message?: string;
};

function isModelAssetResponse(response: Response): boolean {
  const contentType = response.headers.get("content-type") ?? "";

  return response.ok && !contentType.includes("text/html");
}

export async function loadSetManifest(setId: string): Promise<LoadedSetManifest> {
  const entry = setRegistry.find((candidate) => candidate.id === setId);

  if (!entry) {
    throw new Error(`Set ${setId} is not registered.`);
  }

  const manifestResponse = await fetch(entry.manifestPath);

  if (!manifestResponse.ok) {
    throw new Error("Set manifest not found. Check the set folder.");
  }

  const manifestJson: unknown = await manifestResponse.json();
  const manifest = setManifestSchema.parse(manifestJson);
  const modelResponse = await fetch(manifest.model, { method: "HEAD" });
  const modelAvailable = isModelAssetResponse(modelResponse);

  return {
    manifest,
    entry,
    modelAvailable,
    proceduralFallbackActive: !modelAvailable,
    message: modelAvailable ? undefined : proceduralFallbackMessage
  };
}
