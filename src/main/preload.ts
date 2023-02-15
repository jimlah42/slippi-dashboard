import dashboardApi from "dashboard/api";
import { contextBridge } from "electron";
import log from "electron-log";
import path from "path";
import replaysApi from "replays/api";
import settingsApi from "settings/api";

import commonApi from "./api";

const api = {
  common: commonApi,
  replays: replaysApi,
  dashboard: dashboardApi,
  settings: settingsApi,
  path: {
    join: path.join,
  },
  log: log.functions,
};

contextBridge.exposeInMainWorld("electron", api);

export type API = typeof api;
