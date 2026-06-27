import { describe, expect, it } from "vitest";
import {
  SET_STATES,
  SOURCE_STATES,
  STUDIO_RUNTIME_STATES,
  type SetState,
  type SourceState,
  type StudioRuntimeState
} from "../studio/runtime/runtimeTypes";

describe("runtime state values", () => {
  it("keeps studio runtime states explicit", () => {
    const expected: StudioRuntimeState[] = ["booting", "ready", "degraded", "crashed"];

    expect(STUDIO_RUNTIME_STATES).toEqual(expected);
  });

  it("keeps set states explicit", () => {
    const expected: SetState[] = ["idle", "loading", "ready", "switching", "error"];

    expect(SET_STATES).toEqual(expected);
  });

  it("keeps source states explicit", () => {
    const expected: SourceState[] = [
      "unavailable",
      "loading",
      "active",
      "paused",
      "ended",
      "error"
    ];

    expect(SOURCE_STATES).toEqual(expected);
  });
});
