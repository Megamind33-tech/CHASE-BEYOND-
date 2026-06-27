import type { SourceRegistryEntry } from "../runtime/runtimeTypes";
import { sampleVideoSource } from "./sampleSource";

export const sourceRegistry: SourceRegistryEntry[] = [
  {
    id: "none",
    name: "No source",
    type: "none",
    state: "unavailable",
    message: "No media source is active. The development screen uses a neutral material.",
    selectable: true
  },
  sampleVideoSource,
  {
    id: "camera",
    name: "Camera",
    type: "camera",
    state: "unavailable",
    message: "Camera source is registered for the foundation but is not implemented or tested yet.",
    selectable: false
  }
];

export function getSourceById(sourceId: string): SourceRegistryEntry | undefined {
  return sourceRegistry.find((source) => source.id === sourceId);
}
