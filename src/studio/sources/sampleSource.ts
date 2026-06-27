import type { SourceRegistryEntry } from "../runtime/runtimeTypes";

export const sampleVideoSource: SourceRegistryEntry = {
  id: "sample-video",
  name: "Sample Video",
  type: "sample-video",
  url: "/media/sample-video.mp4",
  state: "active",
  message: "Ready",
  selectable: true
};
