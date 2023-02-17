import {
  ipc_clearData,
  ipc_getNewFiles,
  ipc_loadProgressUpdatedEvent,
  ipc_loadReplayFiles,
  ipc_refreshDB,
} from "./ipc";
import type { FileWithPath, Progress } from "./types";

export default {
  async loadFiles(files: FileWithPath[], playerCode: string) {
    const { result } = await ipc_loadReplayFiles.renderer!.trigger({ files, playerCode });
    return result;
  },
  async getNewFiles(path: string) {
    const { result } = await ipc_getNewFiles.renderer!.trigger({ path });
    return result;
  },
  async clearData() {
    await ipc_clearData.renderer!.trigger({});
  },

  async refreshDB(): Promise<void> {
    await ipc_refreshDB.renderer!.trigger({});
  },

  onReplayLoadProgressUpdate(handle: (progress: Progress) => void) {
    const { destroy } = ipc_loadProgressUpdatedEvent.renderer!.handle(async (progress) => {
      handle(progress);
    });
    return destroy;
  },
};
