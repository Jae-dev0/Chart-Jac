import type { OutputMode } from "../output/output-mode.js";
import type { Environment } from "../render/capabilities.js";

export type OutputSource = "flag" | "env" | "terminal" | "pipe";

export function outputProvenance(input: {
  readonly json: boolean;
  readonly human: boolean;
  readonly env: Environment;
  readonly stdoutIsTTY: boolean;
}): { readonly mode: OutputMode; readonly source: OutputSource } {
  if (input.json) return { mode: "json", source: "flag" };
  if (input.human) return { mode: "human", source: "flag" };
  if (input.env.JAC_CHART_JSON === "true" || input.env.JAC_CHART_JSON === "1") {
    return { mode: "json", source: "env" };
  }
  return input.stdoutIsTTY
    ? { mode: "human", source: "terminal" }
    : { mode: "json", source: "pipe" };
}
