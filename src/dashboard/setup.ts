import { createDashboardWorker } from "./dashboard.worker.interface";
import { ipc_getCounts, ipc_getSums, ipc_getWinLoss, ipc_refreshDB } from "./ipc";

export default function setupDashboardIpc() {
  const dashboardBrowerWorker = createDashboardWorker();

  ipc_getWinLoss.main!.handle(async (params) => {
    const worker = await dashboardBrowerWorker;
    const result = await worker.getWinLoss(params);
    return result;
  });

  ipc_getSums.main!.handle(async (params) => {
    const worker = await dashboardBrowerWorker;
    const result = await worker.getSums(params);
    return result;
  });

  ipc_getCounts.main!.handle(async (params) => {
    const worker = await dashboardBrowerWorker;
    const result = await worker.getCounts(params);
    return result;
  });

  ipc_refreshDB.main!.handle(async () => {
    const worker = await dashboardBrowerWorker;
    await worker.refreshDB().catch((err) => console.warn(err));
    return { success: true };
  });
}
