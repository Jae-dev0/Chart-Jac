export function instanceHost(): string | undefined {
  const clientUrl = process.env.JAC_CHART_CLIENT_URL;
  if (!clientUrl) return undefined;

  try {
    return new URL(clientUrl).host;
  } catch {
    return undefined;
  }
}
