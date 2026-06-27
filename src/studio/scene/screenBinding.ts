import type { Mesh, Scene } from "@babylonjs/core";
import type { ScreenBinding } from "../../schemas/setManifestSchema";

export const REQUIRED_SCREEN_MESH = "Screen_Main";

export function findScreenMesh(scene: Scene, binding: ScreenBinding): Mesh | null {
  const mesh = scene.getMeshByName(binding.meshName);
  return mesh && "material" in mesh ? (mesh as Mesh) : null;
}
