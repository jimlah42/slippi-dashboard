import type { EmptyPayload, SuccessPayload } from "../utils/ipc";
import { _, makeEndpoint } from "../utils/ipc";
import type { DataAvgs, DataCounts, QueryParams } from "./types";

//Handlers
export const ipc_getWinLoss = makeEndpoint.main("getWinLoss", <QueryParams>_, <{ Wins: number; Losses: number }>_);

export const ipc_getAvgs = makeEndpoint.main("getAvgs", <QueryParams>_, <DataAvgs>_);

export const ipc_getCounts = makeEndpoint.main("getCounts", <QueryParams>_, <DataCounts>_);

export const ipc_refreshDB = makeEndpoint.main("refreshDBDash", <EmptyPayload>_, <SuccessPayload>_);
