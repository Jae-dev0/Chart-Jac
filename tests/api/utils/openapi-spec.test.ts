import { describe, expect, it } from "vite-plus/test";
import { normalizeApiServerUrl } from "../../../apps/api/src/utils/openapi-spec";

describe("normalizeApiServerUrl", () => {
  it("appends /api when the base has no api suffix", () => {
    expect(normalizeApiServerUrl("https://cloud.jac-chart.app")).toBe(
      "https://cloud.jac-chart.app/api",
    );
  });

  it("leaves a URL that already ends with /api alone", () => {
    expect(normalizeApiServerUrl("https://cloud.jac-chart.app/api")).toBe(
      "https://cloud.jac-chart.app/api",
    );
  });

  it("strips trailing slashes before appending", () => {
    expect(normalizeApiServerUrl("https://cloud.jac-chart.app///")).toBe(
      "https://cloud.jac-chart.app/api",
    );
    expect(normalizeApiServerUrl("https://cloud.jac-chart.app/api/")).toBe(
      "https://cloud.jac-chart.app/api",
    );
  });
});
