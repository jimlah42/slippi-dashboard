import electronLog from "electron-log";
import { Worker } from "threads";

import type { RegisteredWorker } from "../utils/registerWorker";
import { registerWorker } from "../utils/registerWorker";
import type { WorkerSpec } from "./dashboard.worker";

export type DashboardWorker = RegisteredWorker<WorkerSpec>;

const log = electronLog.scope("replays.worker");

export async function createDashboardWorker(): Promise<DashboardWorker> {
  log.debug("dashboard: Spawning Worker");

  const replayWorker = await registerWorker<WorkerSpec>(new Worker("./dashboard.worker"));
  log.debug("dashboard: Spawning Worker: Done");

  return replayWorker;
}
