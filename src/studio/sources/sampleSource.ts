import type { SourceRegistryEntry } from "../runtime/runtimeTypes";

export const missingSampleVideoMessage =
  "No real sample media file exists yet. Add a lightweight file under public/media before enabling sample-video.";

export const sampleVideoSource: SourceRegistryEntry = {
  id: "sample-video",
  name: "Sample video",
  type: "sample-video",
  url: "/media/sample-video.mp4",
  state: "unavailable",
  message: missingSampleVideoMessage,
  selectable: false
};
