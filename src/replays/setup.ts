import {
  ipc_clearData,
  ipc_getNewFiles,
  ipc_loadProgressUpdatedEvent,
  ipc_loadReplayFiles,
  ipc_refreshDB,
} from "./ipc";
import { createReplayWorker } from "./replays.worker.interface";

export default function setupReplayIpc() {
  const replayBrowserWorker = createReplayWorker();

  ipc_loadReplayFiles.main!.handle(async ({ files, playerCode }) => {
    const worker = await replayBrowserWorker;
    worker.getProgressObservable().subscribe((progress) => {
      ipc_loadProgressUpdatedEvent.main!.trigger(progress).catch(console.warn);
    });
    const result = await worker.loadReplayFiles(files, playerCode);
    return result;
  });

  ipc_getNewFiles.main!.handle(async ({ path }) => {
    const worker = await replayBrowserWorker;
    const result = await worker.getNewFilesInFolder(path);
    return result;
  });

  ipc_clearData.main!.handle(async () => {
    const worker = await replayBrowserWorker;
    await worker.clearData();
    await worker.refreshDB();
    return { success: true };
  });

  ipc_refreshDB.main!.handle(async () => {
    const worker = await replayBrowserWorker;
    await worker.refreshDB().catch((err) => console.warn(err));
    return { success: true };
  });
}
