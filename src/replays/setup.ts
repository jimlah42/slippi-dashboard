import {
  ipc_clearCode,
  ipc_clearData,
  ipc_clearFiltered,
  ipc_getNewFiles,
  ipc_loadProgressUpdatedEvent,
  ipc_loadReplayFiles,
  ipc_refreshDB,
} from "./ipc";
import { createReplayWorker } from "./replays.worker.interface";

export default async function setupReplayIpc(resPath: string | undefined, dbPath: string) {
  const replayBrowserWorker = createReplayWorker();

  ipc_loadReplayFiles.main!.handle(async ({ files, playerCodes }) => {
    const worker = await replayBrowserWorker;
    worker.getProgressObservable().subscribe((progress) => {
      ipc_loadProgressUpdatedEvent.main!.trigger(progress).catch(console.warn);
    });
    const result = await worker.loadReplayFiles(resPath, dbPath, files, playerCodes);
    return result;
  });
  ipc_getNewFiles.main!.handle(async ({ path }) => {
    const worker = await replayBrowserWorker;
    const result = await worker.getNewFilesInFolder(dbPath, path);
    return result;
  });

  ipc_clearData.main!.handle(async () => {
    const worker = await replayBrowserWorker;
    await worker.clearData(dbPath);
    await worker.refreshDB(dbPath);
    return { success: true };
  });

  ipc_clearFiltered.main!.handle(async () => {
    const worker = await replayBrowserWorker;
    await worker.clearFiltered(dbPath);
    await worker.refreshDB(dbPath);
    return { success: true };
  });

  ipc_clearCode.main!.handle(async ({ playerCode }) => {
    const worker = await replayBrowserWorker;
    await worker.clearCode(dbPath, playerCode);
    await worker.refreshDB(dbPath);
    return { success: true };
  });

  ipc_refreshDB.main!.handle(async () => {
    const worker = await replayBrowserWorker;
    await worker.refreshDB(dbPath).catch((err) => console.warn(err));
    return { success: true };
  });
}
