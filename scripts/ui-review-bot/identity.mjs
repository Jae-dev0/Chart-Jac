export const REPO = "Jae-dev0/JacChart";

export function prNumber(value) {
  const match = String(value)
    .trim()
    .match(
      /^(?:https:\/\/github\.com\/usejac-chart\/jacChart\/pull\/)?([1-9]\d{0,6})\/?$/,
    );
  if (!match)
    throw new Error(
      "Enter a JacChart PR number or its github.com/Jae-dev0/JacChart/pull/… URL.",
    );
  return Number(match[1]);
}
