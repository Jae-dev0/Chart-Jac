import { describe, expect, it } from "vite-plus/test";
import { makeUi } from "../render/ui.js";
import { renderExported } from "./render-exported.js";

const ui = makeUi({
  color: 0,
  unicode: true,
  hyperlinks: false,
  animate: false,
  columns: 80,
});

describe("renderExported", () => {
  it("names the project, the count and the file", () => {
    expect(
      renderExported(ui, {
        file: "kan.json",
        tasks: 15,
        project: { name: "JacChart Web", key: "KAN", url: "https://jacChart.test/p" },
      }),
    ).toEqual([
      "",
      "  ✓ Exported 15 tasks from JacChart Web · KAN → kan.json",
      "",
    ]);
  });
});
