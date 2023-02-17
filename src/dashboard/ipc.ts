import type { EmptyPayload, SuccessPayload } from "../utils/ipc";
import { _, makeEndpoint } from "../utils/ipc";
import type { DataCounts, DataSums, QueryParams } from "./types";

//Handlers
export const ipc_getWinLoss = makeEndpoint.main("getWinLoss", <QueryParams>_, <{ Wins: number; Losses: number }>_);

export const ipc_getSums = makeEndpoint.main("getSums", <QueryParams>_, <DataSums>_);

export const ipc_getCounts = makeEndpoint.main("getCounts", <QueryParams>_, <DataCounts>_);

export const ipc_refreshDB = makeEndpoint.main("refreshDBDash", <EmptyPayload>_, <SuccessPayload>_);
