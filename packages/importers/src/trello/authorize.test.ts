import { describe, expect, it } from "vite-plus/test";
import { trelloAuthorizeUrl } from "./authorize.js";

describe("trelloAuthorizeUrl", () => {
  it("asks for a read-only, one day token for JacChart", () => {
    expect(trelloAuthorizeUrl(" abc123 ")).toBe(
      "https://trello.com/1/authorize?expiration=1day&scope=read&response_type=token&name=JacChart&key=abc123",
    );
  });

  it("encodes the key", () => {
    expect(trelloAuthorizeUrl("a&b")).toContain("key=a%26b");
  });
});
