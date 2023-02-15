import { ipcMain } from "electron";

import { ipc_setPlayerCode, ipc_setReplaysPath } from "./ipc";
import type { SettingsManager } from "./settingsManager";

export default function setupSettingsIpc(settingsManager: SettingsManager) {
  ipcMain.on("getAppSettingsSync", (event) => {
    const settings = settingsManager.get();
    event.returnValue = settings;
  });

  ipc_setPlayerCode.main!.handle(async ({ playerCode }) => {
    await settingsManager.setPlayerCode(playerCode);
    return { success: true };
  });

  ipc_setReplaysPath.main!.handle(async ({ replaysPath }) => {
    console.log("Setup: " + replaysPath);
    await settingsManager.setReplaysPath(replaysPath);
    return { success: true };
  });
}
