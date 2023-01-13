import electronLog from "electron-log";
import type { RegisteredWorker } from "utils/registerWorker";
import { registerWorker } from "utils/registerWorker";

import type { WorkerSpec } from "./replays.worker";

export type ReplayWorker = RegisteredWorker<WorkerSpec>;

const log = electronLog.scope("replays.worker");

export async function createReplayWorker(): Promise<ReplayWorker> {
  log.debug("replays: Spawning Worker");

  const replayWorker = await registerWorker<WorkerSpec>(new Worker("./replays.worker"));
  log.debug("replays: Spawning Worker: Done");

  return replayWorker;
}
