import { contextBridge } from "electron";
import log from "electron-log";
import path from "path";


import commonApi from "./api";


const api = {
  common: commonApi,
  path: {
    join: path.join,
  },
  log: log.functions,
};

contextBridge.exposeInMainWorld("electron", api);

export type API = typeof api;
