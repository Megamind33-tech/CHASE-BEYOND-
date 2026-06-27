import type { SourceRegistryEntry } from "../runtime/runtimeTypes";
import { sampleVideoSource } from "./sampleSource";

export const sourceRegistry: SourceRegistryEntry[] = [
  {
    id: "none",
    name: "No Source",
    type: "none",
    state: "unavailable",
    message: "Idle",
    selectable: true
  },
  sampleVideoSource,
  {
    id: "camera",
    name: "Camera",
    type: "camera",
    state: "unavailable",
    message: "Unavailable",
    selectable: false
  }
];

export function getSourceById(sourceId: string): SourceRegistryEntry | undefined {
  return sourceRegistry.find((source) => source.id === sourceId);
}
