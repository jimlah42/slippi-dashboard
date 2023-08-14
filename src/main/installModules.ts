import setupDashboardIpc from "dashboard/setup";
import { SettingsManager } from "settings/settingsManager";
import setupSettingsIpc from "settings/setup";

import setupReplayIpc from "../replays/setup";
import setupMainIpc from "./setup";

export const settingsManager = new SettingsManager();
export async function installModules(resPath: string | undefined, dbPath: string) {
  await setupReplayIpc(resPath, dbPath);
  await setupDashboardIpc(dbPath);
  setupMainIpc();
  setupSettingsIpc(settingsManager);
  // return settingsManager;
}
