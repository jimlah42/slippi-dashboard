import { ipc_loadReplayFiles } from "./ipc";
import { createReplayWorker } from "./replays.worker.interface";

export default function setupReplayIpc() {
  const replayBrowserWorker = createReplayWorker();

  ipc_loadReplayFiles.main!.handle(async ({ files }) => {
    const worker = await replayBrowserWorker;
    const result = await worker.loadReplayFiles(files);
    return result;
  });
}
