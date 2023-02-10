import { expose } from "threads";
import type { ModuleMethods } from "threads/dist/types/master";

interface Methods {
  dispose: () => Promise<void>;
}

export type WorkerSpec = ModuleMethods & Methods;

const methods: WorkerSpec = {
  async dispose(): Promise<void> {
    console.log("dashboard: dispose worker");
  },
};

expose(methods);
