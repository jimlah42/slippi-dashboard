import type { SuccessPayload } from "utils/ipc";
import { _, makeEndpoint } from "utils/ipc";

import type { AppSettings } from "./types";

//Handlers
export const ipc_setPlayerCode = makeEndpoint.main("setPlayerCode", <{ playerCode: string }>_, <SuccessPayload>_);

export const ipc_setReplaysPath = makeEndpoint.main("setReplaysPath", <{ replaysPath: string }>_, <SuccessPayload>_);

//Events
export const ipc_settingsUpdatedEvent = makeEndpoint.renderer("settings_settingsUpdated", <AppSettings>_);
