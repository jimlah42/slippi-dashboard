import type { EmptyPayload, SuccessPayload } from "../utils/ipc";
import { _, makeEndpoint } from "../utils/ipc";
import type { FilesLoadResult, FileWithPath, Progress } from "./types";

//Handlers
export const ipc_loadReplayFiles = makeEndpoint.main(
  "loadFiles",
  <{ files: FileWithPath[]; playerCodes: string[] }>_,
  <FilesLoadResult>_,
);

export const ipc_getNewFiles = makeEndpoint.main("getNewFiles", <{ path: string }>_, <FileWithPath[]>_);

export const ipc_clearData = makeEndpoint.main("clearData", <EmptyPayload>_, <SuccessPayload>_);

export const ipc_clearFiltered = makeEndpoint.main("clearFiltered", <EmptyPayload>_, <SuccessPayload>_);

export const ipc_clearCode = makeEndpoint.main("clearCode", <{ playerCode: string }>_, <SuccessPayload>_);

export const ipc_refreshDB = makeEndpoint.main("refreshDB", <EmptyPayload>_, <SuccessPayload>_);

//Events
export const ipc_loadProgressUpdatedEvent = makeEndpoint.renderer("replays_loadProgessUpdated", <Progress>_);
