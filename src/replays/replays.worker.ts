import type { ModuleMethods } from "threads/dist/types/master";
import { expose } from "threads/worker";

import { loadFiles } from "./loadFiles";
import type { FilesLoadResult } from "./types";

interface Methods {
  dispose: () => Promise<void>;
  loadMultipleFiles(files: string[]): Promise<FilesLoadResult>;
}

export type WorkerSpec = ModuleMethods & Methods;

const methods: WorkerSpec = {
  async dispose(): Promise<void> {
    console.log("dispose worker");
  },
  async loadMultipleFiles(files: string[]): Promise<FilesLoadResult> {
    const result = await loadFiles(files, REPLAYS_PATH);
    return result;
  },
};

expose(methods);
