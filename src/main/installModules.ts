import setupDashboardIpc from "dashboard/setup";
import { SettingsManager } from "settings/settingsManager";
import setupSettingsIpc from "settings/setup";

import setupReplayIpc from "../replays/setup";
import setupMainIpc from "./setup";

export const settingsManager = new SettingsManager();
export function installModules() {
  setupReplayIpc();
  setupDashboardIpc();
  setupMainIpc();
  setupSettingsIpc(settingsManager);
  // return settingsManager;
}
