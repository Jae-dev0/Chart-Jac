import { describe, expect, it } from "vite-plus/test";
import {
  hashTrialEmail,
  normalizeTrialEmail,
} from "../../../apps/api/src/billing/trial-identity";

describe("normalizeTrialEmail", () => {
  it("lowercases and trims", () => {
    expect(normalizeTrialEmail("  Andrej@JacChart.APP ")).toBe("contact@jac-chart.app");
  });

  it("drops plus tags so aliases share one trial", () => {
    expect(normalizeTrialEmail("andrej+trial2@jac-chart.app")).toBe(
      "contact@jac-chart.app",
    );
  });

  it("keeps the address when stripping would empty the local part", () => {
    expect(normalizeTrialEmail("+tag@jac-chart.app")).toBe("+tag@jac-chart.app");
  });

  it("leaves values without an address shape alone", () => {
    expect(normalizeTrialEmail("not-an-email")).toBe("not-an-email");
  });
});

describe("hashTrialEmail", () => {
  it("matches for addresses that normalize to the same mailbox", () => {
    expect(hashTrialEmail("Andrej+one@jac-chart.app")).toBe(
      hashTrialEmail("contact@jac-chart.app"),
    );
  });

  it("differs for different mailboxes", () => {
    expect(hashTrialEmail("a@jac-chart.app")).not.toBe(
      hashTrialEmail("b@jac-chart.app"),
    );
  });

  it("does not store the address itself", () => {
    expect(hashTrialEmail("contact@jac-chart.app")).not.toContain("jac-chart");
  });
});
