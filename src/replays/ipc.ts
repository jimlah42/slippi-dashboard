import { _, makeEndpoint } from "../utils/ipc";
import type { FilesLoadResult } from "./types";

export const ipc_loadReplayFiles = makeEndpoint.main("loadFiles", <{ files: string[] }>_, <FilesLoadResult>_);
