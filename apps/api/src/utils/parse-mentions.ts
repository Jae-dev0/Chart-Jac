// Extract unique mentioned user ids from a comment/description body. Matches the
// `<jac-chart-mention id="...">` tag the editor serializes @mentions to.
export function parseMentionIds(content: string | null | undefined): string[] {
  if (!content) return [];
  const ids = new Set<string>();
  const re = /<jac-chart-mention[^>]*\bid="([^"]+)"/gi;
  for (let m = re.exec(content); m !== null; m = re.exec(content)) {
    if (m[1]) ids.add(m[1]);
  }
  return [...ids];
}
