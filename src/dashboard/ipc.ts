import type { EmptyPayload, SuccessPayload } from "../utils/ipc";
import { _, makeEndpoint } from "../utils/ipc";
import type { QueryParams } from "./types";

//Handlers
export const ipc_getWinLoss = makeEndpoint.main("getWinLoss", <QueryParams>_, <{ Wins: number; Losses: number }>_);

export const ipc_getOpenings = makeEndpoint.main("getOpenings", <QueryParams>_, <{ Openings: number }>_);

export const ipc_refreshDB = makeEndpoint.main("refreshDB", <EmptyPayload>_, <SuccessPayload>_);
