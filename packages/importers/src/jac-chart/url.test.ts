import { describe, expect, it } from "vite-plus/test";
import { normalizeJacChartUrl } from "./url.js";

describe("normalizeJacChartUrl", () => {
  it("keeps a plain instance URL", () => {
    expect(normalizeJacChartUrl("https://cloud.jac-chart.app")).toBe(
      "https://cloud.jac-chart.app",
    );
  });

  it("strips a trailing /api and slashes", () => {
    expect(normalizeJacChartUrl("https://cloud.jac-chart.app/api/")).toBe(
      "https://cloud.jac-chart.app",
    );
    expect(normalizeJacChartUrl("https://example.com/jac-chart/api")).toBe(
      "https://example.com/jacChart",
    );
  });

  it("adds https when the protocol is missing", () => {
    expect(normalizeJacChartUrl("jac-chart.example.com/api")).toBe(
      "https://jacChart.example.com",
    );
  });

  it("drops web app routes pasted from the address bar", () => {
    expect(
      normalizeJacChartUrl(
        "https://cloud.jac-chart.app/dashboard/workspace/ws1/project/p1/board",
      ),
    ).toBe("https://cloud.jac-chart.app");
    expect(normalizeJacChartUrl("http://localhost:5173/auth/sign-in")).toBe(
      "http://localhost:5173",
    );
  });
});
