import { ipcRenderer } from "electron";

import { ipc_setPlayerCodes, ipc_setReplaysPath, ipc_settingsUpdatedEvent } from "./ipc";
import type { AppSettings } from "./types";

export default {
  getAppSettingsSync() {
    return ipcRenderer.sendSync("getAppSettingsSync") as AppSettings;
  },
  onSettingsUpdated(handle: (settings: AppSettings) => void) {
    const { destroy } = ipc_settingsUpdatedEvent.renderer!.handle(async (settings) => {
      handle(settings);
    });
    return destroy;
  },
  async setPlayerCodes(playerCodes: string[]): Promise<void> {
    await ipc_setPlayerCodes.renderer!.trigger({ playerCodes });
  },
  async setReplaysPath(replaysPath: string): Promise<void> {
    console.log("Triggering Set: " + replaysPath);
    await ipc_setReplaysPath.renderer!.trigger({ replaysPath });
  },
};
