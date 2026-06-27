import type { SourceRegistryEntry } from "../runtime/runtimeTypes";

export const missingSampleVideoMessage = "Missing";

export const sampleVideoSource: SourceRegistryEntry = {
  id: "sample-video",
  name: "Sample Video",
  type: "sample-video",
  url: "/media/sample-video.mp4",
  state: "unavailable",
  message: missingSampleVideoMessage,
  selectable: false
};
