import { ipc_getCounts, ipc_getSums, ipc_getWinLoss, ipc_refreshDB } from "./ipc";
import type { QueryParams } from "./types";

export default {
  async getWinLoss(params: QueryParams) {
    const { result } = await ipc_getWinLoss.renderer!.trigger(params);
    return result;
  },
  async getSums(params: QueryParams) {
    const { result } = await ipc_getSums.renderer!.trigger(params);
    return result;
  },
  async getCounts(params: QueryParams) {
    const { result } = await ipc_getCounts.renderer!.trigger(params);
    return result;
  },
  async refreshDB(): Promise<void> {
    await ipc_refreshDB.renderer!.trigger({});
  },
};
