import type { EmptyPayload, SuccessPayload } from "../utils/ipc";
import { _, makeEndpoint } from "../utils/ipc";
import type { FilesLoadResult, Progress } from "./types";

//Handlers
export const ipc_loadReplayFiles = makeEndpoint.main("loadFiles", <{ files: string[] }>_, <FilesLoadResult>_);

export const ipc_getNewFiles = makeEndpoint.main("getNewFiles", <{ path: string }>_, <string[]>_);

export const ipc_clearData = makeEndpoint.main("clearData", <EmptyPayload>_, <SuccessPayload>_);

//Events
export const ipc_loadProgressUpdatedEvent = makeEndpoint.renderer("replays_loadProgessUpdated", <Progress>_);
