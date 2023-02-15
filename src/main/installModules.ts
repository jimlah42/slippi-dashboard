import setupDashboardIpc from "dashboard/setup";
import { SettingsManager } from "settings/settingsManager";
import setupSettingsIpc from "settings/setup";

import setupReplayIpc from "../replays/setup";
import setupMainIpc from "./setup";

export function installModules() {
  const settingsManager = new SettingsManager();
  setupReplayIpc();
  setupDashboardIpc();
  setupMainIpc();
  setupSettingsIpc(settingsManager);
  return settingsManager;
}
