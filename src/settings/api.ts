import { ipcRenderer } from "electron";

import { ipc_setPlayerCode, ipc_setReplaysPath, ipc_settingsUpdatedEvent } from "./ipc";
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
  async setPlayerCode(playerCode: string): Promise<void> {
    await ipc_setPlayerCode.renderer!.trigger({ playerCode });
  },
  async setReplaysPath(replaysPath: string): Promise<void> {
    console.log("Triggering Set: " + replaysPath);
    await ipc_setReplaysPath.renderer!.trigger({ replaysPath });
  },
};
