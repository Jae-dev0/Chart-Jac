import { Effect, Schema } from "effect";
import { JacChartApi } from "./jac-chart-api.js";

export const DuplicatedTask = Schema.Struct({
  id: Schema.String,
  projectId: Schema.String,
  number: Schema.NullOr(Schema.Number),
  title: Schema.String,
  status: Schema.String,
});
export type DuplicatedTask = typeof DuplicatedTask.Type;

export const duplicateTask = Effect.fnUntraced(function* (
  taskId: string,
  title: string | undefined,
) {
  const api = yield* JacChartApi;
  return yield* api.request(
    "POST",
    `/api/task/duplicate/${encodeURIComponent(taskId)}`,
    DuplicatedTask,
    { body: title === undefined ? {} : { title } },
  );
});
