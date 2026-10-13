import { render } from "@react-email/render";
import { createElement } from "react";
import { describe, expect, it } from "vite-plus/test";
import MagicLinkEmail from "./magic-link";

describe("MagicLinkEmail", () => {
  it("renders Japanese copy for a Japanese locale", async () => {
    const html = await render(
      createElement(MagicLinkEmail, {
        magicLink: "https://jacChart.example/auth",
        locale: "ja-JP",
      }),
    );
    expect(html).toContain("JacChart にサインイン");
    expect(html).toContain("JacChart セキュリティメール");
  });

  it("renders Traditional Chinese copy for a zh-TW locale", async () => {
    const html = await render(
      createElement(MagicLinkEmail, {
        magicLink: "https://jacChart.example/auth",
        locale: "zh-TW",
      }),
    );
    expect(html).toContain("登入 JacChart");
    expect(html).toContain("JacChart 安全性通知");
  });
});
