import { describe, expect, it } from "vite-plus/test";
import { keyConflictHint } from "./key-conflict.js";

describe("keyConflictHint", () => {
  it("suggests a free key for create and edit", () => {
    expect(keyConflictHint("KANE", undefined)).toBe(
      "Pick another key, for example --key KANE.",
    );
    expect(keyConflictHint(undefined, undefined)).toBe(
      "Pick another key with --key.",
    );
  });

  it("points at jacChart project edit when the key has to change first", () => {
    expect(keyConflictHint("KAN2", "jac-chart project edit p1")).toBe(
      "Give it another key first, for example jacChart project edit p1 --key KAN2.",
    );
  });
});
