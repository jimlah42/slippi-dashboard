import type { ModuleMethods } from "threads/dist/types/master";
import { Observable, Subject } from "threads/observable";
import { expose } from "threads/worker";

import { getNewFiles } from "./getNewFiles";
import { loadFiles } from "./loadFiles";
import type { FilesLoadResult, Progress } from "./types";

interface Methods {
  dispose: () => Promise<void>;
  loadReplayFiles(files: string[]): Promise<FilesLoadResult>;
  getNewFilesInFolder(path: string): Promise<string[]>;
  getProgressObservable(): Observable<Progress>;
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

  async loadReplayFiles(files: string[]): Promise<FilesLoadResult> {
    const result = await loadFiles(files, "src/tests/slpLarge/", (current, total) => {
      progressSubject.next({ current, total });
    });
    progressSubject.complete();
    progressSubject = new Subject();
    return result;
  },

  async getNewFilesInFolder(path: string): Promise<string[]> {
    const result = await getNewFiles(path);
    return result;
  },
};

expose(methods);
