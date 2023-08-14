import { createConnection } from "data/datasouce";
import { Filtered } from "data/entity/Filtered";
import { Stats } from "data/entity/Stats";
import type { ModuleMethods } from "threads/dist/types/master";
import { Observable, Subject } from "threads/observable";
import { expose } from "threads/worker";

import { getNewFiles } from "./getNewFiles";
import { loadFiles } from "./loadFiles";
import type { FilesLoadResult, FileWithPath, Progress } from "./types";

interface Methods {
  dispose: () => Promise<void>;
  getProgressObservable(): Observable<Progress>;
  loadReplayFiles(
    resPath: string | undefined,
    dbPath: string,
    files: FileWithPath[],
    playerCodes: string[],
  ): Promise<FilesLoadResult>;
  getNewFilesInFolder(resPath: string, path: string): Promise<FileWithPath[]>;
  clearData(resPath: string): Promise<void>;
  clearFiltered(resPath: string): Promise<void>;
  clearCode(resPath: string, playerCode: string): Promise<void>;
  refreshDB: (resPath: string) => Promise<void>;
}

export type WorkerSpec = ModuleMethods & Methods;

let progressSubject: Subject<Progress> = new Subject();

const methods: WorkerSpec = {
  async dispose(): Promise<void> {
    progressSubject.complete();
    console.log("replay: dispose worker");
  },

  getProgressObservable(): Observable<Progress> {
    return Observable.from(progressSubject);
  },

  async loadReplayFiles(
    resPath: string | undefined,
    dbPath: string,
    files: FileWithPath[],
    playerCodes: string[],
  ): Promise<FilesLoadResult> {
    console.log("Wokering loading files");

    const result = await loadFiles(resPath, dbPath, files, playerCodes, (current, total) => {
      progressSubject.next({ current, total });
    });
    progressSubject.complete();
    progressSubject = new Subject();
    return result;
  },

  async getNewFilesInFolder(resPath: string, path: string): Promise<FileWithPath[]> {
    const result = await getNewFiles(resPath, path);
    return result;
  },

  async clearData(resPath: string): Promise<void> {
    const db = await createConnection(resPath);
    console.log("Clearing all data...");
    await db.manager.clear(Stats);
    await db.manager.clear(Filtered);
    console.log("Data cleared");
  },
  async clearFiltered(resPath: string): Promise<void> {
    const db = await createConnection(resPath);
    console.log("Clearing filtered data...");
    await db.manager.clear(Filtered);
    console.log("Filtered cleared");
  },
  async clearCode(resPath: string, playerCode: string): Promise<void> {
    const db = await createConnection(resPath);
    console.log("Clearing " + playerCode + "data...");
    await db.manager.delete(Stats, { Code: playerCode });
    console.log(playerCode + " cleared");
  },

  async refreshDB(resPath: string): Promise<void> {
    const db = await createConnection(resPath);
    console.log("Refreshing DB...");
    await db.destroy();
    await db.initialize();
    console.log("Refreshed");
  },
};

expose(methods);
