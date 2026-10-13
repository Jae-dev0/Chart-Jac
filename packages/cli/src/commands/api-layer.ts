import { Layer } from "effect";
import { JacChartApiLive } from "../api/jac-chart-api.js";
import { SessionLive } from "../services/session.js";

export const ApiLayer = JacChartApiLive.pipe(Layer.provideMerge(SessionLive));
