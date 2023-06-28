import { ipcMain } from "electron";

import { ipc_setPlayerCodes, ipc_setReplaysPath } from "./ipc";
import type { SettingsManager } from "./settingsManager";

export default function setupSettingsIpc(settingsManager: SettingsManager) {
  ipcMain.on("getAppSettingsSync", (event) => {
    const settings = settingsManager.get();
    event.returnValue = settings;
  });

  ipc_setPlayerCodes.main!.handle(async ({ playerCodes }) => {
    await settingsManager.setPlayerCodes(playerCodes);
    return { success: true };
  });

  ipc_setReplaysPath.main!.handle(async ({ replaysPath }) => {
    console.log("Setup: " + replaysPath);
    await settingsManager.setReplaysPath(replaysPath);
    return { success: true };
  });
}
