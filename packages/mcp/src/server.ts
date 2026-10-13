import { createRequire } from "node:module";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { AuthService } from "./auth/auth-service.js";
import { JacChartClient } from "./jac-chart/client.js";
import { registerTools } from "./tools/register.js";
import { normalizeBaseUrl } from "./utils/normalize-base-url.js";

const require = createRequire(import.meta.url);
const { version: packageVersion } = require("../package.json") as {
  version: string;
};

export function createMcpServer(): McpServer {
  const baseUrl = normalizeBaseUrl(
    process.env.JAC_CHART_API_URL || "http://localhost:1337",
  );
  const clientId = process.env.JAC_CHART_MCP_CLIENT_ID || "jac-chart-mcp";
  const apiKey = process.env.JAC_CHART_API_KEY || undefined;
  const auth = new AuthService({ baseUrl, clientId, apiKey });
  const client = new JacChartClient({ baseUrl, auth });
  const server = new McpServer({
    name: "jac-chart-mcp",
    version: packageVersion,
  });
  registerTools(server, { client });
  return server;
}
