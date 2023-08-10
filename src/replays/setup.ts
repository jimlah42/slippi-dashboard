import { app } from "electron";

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

export default function setupReplayIpc() {
  const replayBrowserWorker = createReplayWorker();

  ipc_loadReplayFiles.main!.handle(async ({ files, playerCodes }) => {
    const worker = await replayBrowserWorker;
    worker.getProgressObservable().subscribe((progress) => {
      ipc_loadProgressUpdatedEvent.main!.trigger(progress).catch(console.warn);
    });
    let resPath;
    if (app.isPackaged) {
      resPath = process.resourcesPath;
    } else {
      resPath = undefined;
    }
    const result = await worker.loadReplayFiles(resPath, files, playerCodes);
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

  ipc_clearFiltered.main!.handle(async () => {
    const worker = await replayBrowserWorker;
    await worker.clearFiltered();
    await worker.refreshDB();
    return { success: true };
  });

  ipc_clearCode.main!.handle(async ({ playerCode }) => {
    const worker = await replayBrowserWorker;
    await worker.clearCode(playerCode);
    await worker.refreshDB();
    return { success: true };
  });

  ipc_refreshDB.main!.handle(async () => {
    const worker = await replayBrowserWorker;
    await worker.refreshDB().catch((err) => console.warn(err));
    return { success: true };
  });
}
