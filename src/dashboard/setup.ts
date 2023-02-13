import { createDashboardWorker } from "./dashboard.worker.interface";
import { ipc_getOpenings, ipc_getWinLoss, ipc_refreshDB } from "./ipc";

export default function setupDashboardIpc() {
  const dashboardBrowerWorker = createDashboardWorker();

  ipc_getWinLoss.main!.handle(async (params) => {
    const worker = await dashboardBrowerWorker;
    const result = await worker.getWinLoss(params);
    return result;
  });

  ipc_getOpenings.main!.handle(async (params) => {
    const worker = await dashboardBrowerWorker;
    const result = await worker.getOpenings(params);
    return result;
  });

  ipc_refreshDB.main!.handle(async () => {
    const worker = await dashboardBrowerWorker;
    await worker.refreshDB().catch((err) => console.warn(err));
    return { success: true };
  });
}
