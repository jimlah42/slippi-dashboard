import { ipc_getOpenings, ipc_getWinLoss, ipc_refreshDB } from "./ipc";
import type { QueryParams } from "./types";

export default {
  async getWinLoss(params: QueryParams) {
    const { result } = await ipc_getWinLoss.renderer!.trigger(params);
    return result;
  },
  async getOpenings(params: QueryParams) {
    const { result } = await ipc_getOpenings.renderer!.trigger(params);
    return result;
  },
  async refreshDB(): Promise<void> {
    await ipc_refreshDB.renderer!.trigger({});
  },
};
