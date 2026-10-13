import { SourceHttpError } from "../http.js";
import type { ConnectOptions, ImportSource, SourceProject } from "../types.js";
import {
  createJacChartClient,
  type JacChartClient,
  type JacChartWorkspace,
} from "./client.js";
import { readJacChartProject } from "./read-project.js";
import { normalizeJacChartUrl } from "./url.js";

export type JacChartCredentials = {
  url: string;
  apiKey: string;
};

export async function connectJacChart(
  credentials: JacChartCredentials,
  options: ConnectOptions = {},
): Promise<ImportSource> {
  if (!credentials.url?.trim()) {
    throw new Error("Enter the URL of the JacChart instance to import from.");
  }
  const apiKey = credentials.apiKey?.trim();
  if (!apiKey) {
    throw new Error("Enter an API key from the JacChart instance to import from.");
  }

  const baseUrl = normalizeJacChartUrl(credentials.url);
  const clientFor = (signal?: AbortSignal) =>
    createJacChartClient({ baseUrl, apiKey, fetch: options.fetch, signal });

  const workspaces = await clientFor(options.signal).listWorkspaces();

  return {
    listProjects() {
      return listJacChartProjects(clientFor(options.signal), workspaces);
    },
    readProject(projectId, readOptions) {
      return readJacChartProject(
        clientFor(readOptions.signal ?? options.signal),
        projectId,
        readOptions,
      );
    },
  };
}

export async function listJacChartProjects(
  client: JacChartClient,
  workspaces: JacChartWorkspace[],
): Promise<SourceProject[]> {
  const projects: SourceProject[] = [];
  for (const workspace of workspaces) {
    let found;
    try {
      found = await client.listProjects(workspace.id);
    } catch (error) {
      if (
        error instanceof SourceHttpError &&
        (error.status === 403 || error.status === 404)
      ) {
        continue;
      }
      throw error;
    }
    for (const project of found) {
      projects.push({
        id: project.id,
        name: project.name,
        detail: project.archivedAt
          ? `${workspace.name} (archived)`
          : workspace.name,
      });
    }
  }
  return projects;
}
