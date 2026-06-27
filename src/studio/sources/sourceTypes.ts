import type { SourceManifest } from "../../schemas/sourceManifestSchema";
import type { SourceRegistryEntry, SourceState } from "../runtime/runtimeTypes";

export type SourceType = SourceManifest["type"];

export type RegisteredSource = SourceRegistryEntry & {
  type: SourceType;
  state: SourceState;
};
