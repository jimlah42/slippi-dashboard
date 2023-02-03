import { ipc_getNewFiles, ipc_loadProgressUpdatedEvent, ipc_loadReplayFiles } from "./ipc";
import type { Progress } from "./types";

export default {
  async loadFiles(files: string[]) {
    const { result } = await ipc_loadReplayFiles.renderer!.trigger({ files });
    return result;
  },
  async getNewFiles(path: string) {
    const { result } = await ipc_getNewFiles.renderer!.trigger({ path });
    return result;
  },

  onReplayLoadProgressUpdate(handle: (progress: Progress) => void) {
    const { destroy } = ipc_loadProgressUpdatedEvent.renderer!.handle(async (progress) => {
      handle(progress);
    });
    return destroy;
  },
};
