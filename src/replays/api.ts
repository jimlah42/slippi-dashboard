import { ipc_loadReplayFiles } from "./ipc";

export default {
  async loadFiles(files: string[]) {
    const { result } = await ipc_loadReplayFiles.renderer!.trigger({ files });
    return result;
  },
};
