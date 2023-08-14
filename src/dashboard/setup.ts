import { createDashboardWorker } from "./dashboard.worker.interface";
import { ipc_getAvgs, ipc_getCounts, ipc_getPeriodAvgs, ipc_getWinLoss, ipc_refreshDB } from "./ipc";

export default async function setupDashboardIpc(resPath: string) {
  const dashboardBrowerWorker = createDashboardWorker();

  ipc_getWinLoss.main!.handle(async (params) => {
    const worker = await dashboardBrowerWorker;
    const result = await worker.getWinLoss(resPath, params);
    return result;
  });

  ipc_getPeriodAvgs.main!.handle(async (params) => {
    const worker = await dashboardBrowerWorker;
    const result = await worker.getPeriodAvgs(resPath, params);
    return result;
  });

  ipc_getAvgs.main!.handle(async (params) => {
    const worker = await dashboardBrowerWorker;
    const result = await worker.getAvgs(resPath, params);
    return result;
  });

  ipc_getCounts.main!.handle(async (params) => {
    const worker = await dashboardBrowerWorker;
    const result = await worker.getCounts(resPath, params);
    return result;
  });

  ipc_refreshDB.main!.handle(async () => {
    const worker = await dashboardBrowerWorker;
    await worker.refreshDB(resPath).catch((err) => console.warn(err));
    return { success: true };
  });
}
