import { ipc_getAvgs, ipc_getCounts, ipc_getWinLoss, ipc_refreshDB } from "./ipc";
import type { QueryParams } from "./types";

export default {
  async getWinLoss(params: QueryParams) {
    const { result } = await ipc_getWinLoss.renderer!.trigger(params);
    return result;
  },
  async getAvgs(params: QueryParams) {
    const { result } = await ipc_getAvgs.renderer!.trigger(params);
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
