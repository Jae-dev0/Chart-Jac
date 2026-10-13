import { describe, expect, it } from "vite-plus/test";
import { jacChartColorToHex } from "./colors.js";

describe("jacChartColorToHex", () => {
  it("maps JacChart palette names to hex", () => {
    expect(jacChartColorToHex("purple")).toBe("#8b5cf6");
    expect(jacChartColorToHex("dark-gray")).toBe("#64748b");
    expect(jacChartColorToHex("Red")).toBe("#dc2626");
  });

  it("normalizes hex values", () => {
    expect(jacChartColorToHex("#ABCDEF")).toBe("#abcdef");
    expect(jacChartColorToHex("#abc")).toBe("#aabbcc");
    expect(jacChartColorToHex("#abcd")).toBe("#aabbcc");
    expect(jacChartColorToHex("#11223344")).toBe("#112233");
  });

  it("falls back to gray for unknown values", () => {
    expect(jacChartColorToHex("var(--color-sky-500)")).toBe("#6b7280");
    expect(jacChartColorToHex("")).toBe("#6b7280");
    expect(jacChartColorToHex(null)).toBe("#6b7280");
  });
});
