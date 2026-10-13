import { join } from "node:path";
import type { Environment } from "../render/capabilities.js";

export function configPath(env: Environment, home: string): string {
  if (env.JAC_CHART_CONFIG) return env.JAC_CHART_CONFIG;
  const base = env.XDG_CONFIG_HOME || join(home, ".config");
  return join(base, "jac-chart", "config.json");
}
