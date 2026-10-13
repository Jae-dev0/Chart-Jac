export function isCloud(): boolean {
  return process.env.JAC_CHART_CLOUD === "true";
}
