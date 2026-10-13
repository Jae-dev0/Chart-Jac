// Persist the origin in Gitea so delayed webhooks and later imports also skip echoes.
const JAC_CHART_COMMENT_PREFIX = "<!-- Jac-Chart:comment -->\n\n";

export function markJacChartComment(body: string): string {
  // Keep the marker outside user-controlled Markdown, including unclosed code fences.
  return `${JAC_CHART_COMMENT_PREFIX}${body}`;
}

export function isJacChartComment(body: string): boolean {
  return body.startsWith(JAC_CHART_COMMENT_PREFIX);
}
