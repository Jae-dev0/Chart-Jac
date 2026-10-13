import { createJsonClient, SourceHttpError } from "../http.js";
import type { FetchLike } from "../types.js";

export type JacChartWorkspace = {
  id: string;
  name: string;
};

export type JacChartProject = {
  id: string;
  name: string;
  archivedAt?: string | null;
};

export type JacChartLabel = {
  id?: string;
  name: string;
  color: string | null;
};

export type JacChartExternalLink = {
  id: string;
};

export type JacChartBoardTask = {
  id: string;
  title: string;
  number: number | null;
  description: string | null;
  descriptionDeferred?: boolean;
  status: string;
  priority: string | null;
  startDate?: string | null;
  dueDate?: string | null;
  position: number | null;
  createdAt?: string | null;
  userId: string | null;
  assigneeName?: string | null;
  labels?: JacChartLabel[];
  externalLinks?: JacChartExternalLink[];
};

export type JacChartBoardColumn = {
  id: string;
  slug?: string;
  name: string;
  isFinal?: boolean;
  position?: number;
  tasks?: JacChartBoardTask[];
};

export type JacChartBoard = {
  id: string;
  name: string;
  slug?: string | null;
  description: string | null;
  descriptionDeferred?: boolean;
  workspaceId: string;
  columns: JacChartBoardColumn[];
  plannedTasks?: JacChartBoardTask[];
  archivedTasks?: JacChartBoardTask[];
};

export type JacChartBoardPagination = {
  total?: number;
  totalPages?: number;
  relatedTotalPages?: number;
};

export type JacChartBoardPage = {
  board: JacChartBoard;
  pagination: JacChartBoardPagination;
};

export type JacChartMember = {
  id: string;
  name: string;
  email: string;
};

export type JacChartActivity = {
  id: string;
  type: string;
  userId: string | null;
  content: string | null;
  createdAt: string;
  externalUserName?: string | null;
};

export type JacChartComment = {
  id: string;
  user?: { name?: string | null } | null;
};

export type JacChartRelation = {
  id?: string;
  sourceTaskId: string;
  targetTaskId: string;
  relationType: string;
};

export type JacChartCustomField = {
  id: string;
  name: string;
};

export type JacChartClientOptions = {
  baseUrl: string;
  apiKey: string;
  fetch?: FetchLike;
  signal?: AbortSignal;
};

export type JacChartClient = {
  listWorkspaces(): Promise<JacChartWorkspace[]>;
  listProjects(workspaceId: string): Promise<JacChartProject[]>;
  getBoardPage(
    projectId: string,
    page: number,
    relatedPage: number,
  ): Promise<JacChartBoardPage>;
  getProjectDescription(projectId: string): Promise<string | null>;
  getTaskDescription(taskId: string): Promise<string | null>;
  listMembers(workspaceId: string): Promise<JacChartMember[]>;
  listActivities(taskId: string): Promise<JacChartActivity[]>;
  listComments(taskId: string): Promise<JacChartComment[]>;
  listRelations(taskId: string): Promise<JacChartRelation[]>;
  listCustomFields(projectId: string): Promise<JacChartCustomField[]>;
};

export const BOARD_PAGE_SIZE = 100;

export function createJacChartClient(options: JacChartClientOptions): JacChartClient {
  const http = createJsonClient({
    service: "JacChart",
    baseUrl: options.baseUrl,
    headers: () => ({ Authorization: `Bearer ${options.apiKey}` }),
    fetch: options.fetch,
    signal: options.signal,
    describeUnauthorized:
      "JacChart rejected the API key (HTTP 401). Check that the key is active and was created on this instance.",
  });

  async function list<T>(path: string): Promise<T[]> {
    const body = await http.request<unknown>(path);
    if (!Array.isArray(body)) throw notJacChartError(options.baseUrl);
    return body as T[];
  }

  const id = encodeURIComponent;

  return {
    async listWorkspaces() {
      try {
        return await list<JacChartWorkspace>("/api/workspace");
      } catch (error) {
        if (!(error instanceof SourceHttpError) || error.status !== 404) {
          throw error;
        }
      }
      try {
        return await list<JacChartWorkspace>("/api/auth/organization/list");
      } catch (error) {
        if (error instanceof SourceHttpError && error.status === 404) {
          throw notJacChartError(options.baseUrl);
        }
        throw error;
      }
    },
    listProjects(workspaceId) {
      return list<JacChartProject>(
        `/api/project?workspaceId=${id(workspaceId)}&includeArchived=true`,
      );
    },
    async getBoardPage(projectId, page, relatedPage) {
      const query = new URLSearchParams({
        page: String(page),
        limit: String(BOARD_PAGE_SIZE),
        sortBy: "position",
        sortOrder: "asc",
      });
      if (relatedPage > 1) query.set("relatedPage", String(relatedPage));
      const body = await http.request<unknown>(
        `/api/task/tasks/${id(projectId)}?${query}`,
      );
      return toBoardPage(body);
    },
    async getProjectDescription(projectId) {
      const project = await http.request<{ description?: string | null }>(
        `/api/project/${id(projectId)}`,
      );
      return project?.description ?? null;
    },
    async getTaskDescription(taskId) {
      const task = await http.request<{ description?: string | null }>(
        `/api/task/${id(taskId)}`,
      );
      return task?.description ?? null;
    },
    listMembers(workspaceId) {
      return list<JacChartMember>(`/api/workspace/${id(workspaceId)}/members`);
    },
    listActivities(taskId) {
      return list<JacChartActivity>(`/api/activity/${id(taskId)}`);
    },
    listComments(taskId) {
      return list<JacChartComment>(`/api/comment/${id(taskId)}`);
    },
    listRelations(taskId) {
      return list<JacChartRelation>(`/api/task-relation/${id(taskId)}`);
    },
    listCustomFields(projectId) {
      return list<JacChartCustomField>(
        `/api/custom-field/project/${id(projectId)}`,
      );
    },
  };
}

export function toBoardPage(body: unknown): JacChartBoardPage {
  if (isRecord(body) && isBoard(body.data)) {
    const pagination = isRecord(body.pagination)
      ? (body.pagination as JacChartBoardPagination)
      : {};
    return { board: body.data, pagination };
  }
  if (isBoard(body)) return { board: body, pagination: {} };
  throw new Error(
    "JacChart returned an unexpected response for the project board.",
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isBoard(value: unknown): value is JacChartBoard {
  return isRecord(value) && Array.isArray(value.columns);
}

function notJacChartError(baseUrl: string): Error {
  return new Error(
    `No JacChart API answered at ${baseUrl}. Check the instance URL; if the web app and API are hosted separately, use the API URL.`,
  );
}
