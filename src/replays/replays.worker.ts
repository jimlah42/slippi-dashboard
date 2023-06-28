import { dbSource } from "data/datasouce";
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
  loadReplayFiles(files: FileWithPath[], playerCodes: string[]): Promise<FilesLoadResult>;
  getNewFilesInFolder(path: string): Promise<FileWithPath[]>;
  clearData(): Promise<void>;
  clearFiltered(): Promise<void>;
  clearCode(playerCode: string): Promise<void>;
  refreshDB: () => Promise<void>;
}

export type WorkerSpec = ModuleMethods & Methods;

let progressSubject: Subject<Progress> = new Subject();

const methods: WorkerSpec = {
  async dispose(): Promise<void> {
    progressSubject.complete();
    console.log("dispose worker");
  },

  getProgressObservable(): Observable<Progress> {
    return Observable.from(progressSubject);
  },

  async loadReplayFiles(files: FileWithPath[], playerCodes: string[]): Promise<FilesLoadResult> {
    console.log("Wokering loading files");
    const result = await loadFiles(files, playerCodes, (current, total) => {
      progressSubject.next({ current, total });
    });
    progressSubject.complete();
    progressSubject = new Subject();
    return result;
  },

  async getNewFilesInFolder(path: string): Promise<FileWithPath[]> {
    const result = await getNewFiles(path);
    return result;
  },

  async clearData(): Promise<void> {
    const db = await dbSource;
    console.log("Clearing all data...");
    await db.manager.clear(Stats);
    await db.manager.clear(Filtered);
    console.log("Data cleared");
  },
  async clearFiltered(): Promise<void> {
    const db = await dbSource;
    console.log("Clearing filtered data...");
    await db.manager.clear(Filtered);
    console.log("Filtered cleared");
  },
  async clearCode(playerCode: string): Promise<void> {
    const db = await dbSource;
    console.log("Clearing " + playerCode + "data...");
    await db.manager.delete(Stats, { Code: playerCode });
    console.log(playerCode + " cleared");
  },

  async refreshDB(): Promise<void> {
    console.log("Refreshing DB...");
    const db = await dbSource;
    await db.destroy();
    await db.initialize();
    console.log("Refreshed");
  },
};

expose(methods);
