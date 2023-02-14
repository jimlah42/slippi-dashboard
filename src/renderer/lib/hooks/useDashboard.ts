import type { DataCounts, DataSums, QueryParams } from "dashboard/types";
import { create } from "zustand";

type StoreState = {
  Wins: number;
  Losses: number;
  Sums: DataSums | null;
  Counts: DataCounts | null;
  currentParams: QueryParams;
};

type StoreReducers = {
  getWinLoss: () => Promise<void>;
  getSums: () => Promise<void>;
  getCounts: () => Promise<void>;
  setParams: (params: QueryParams) => void;
};

const initialState: StoreState = {
  Wins: 0,
  Losses: 0,
  Sums: null,
  Counts: null,
  currentParams: {},
};

export const useDashboard = create<StoreState & StoreReducers>((set, get) => ({
  ...initialState,

  getWinLoss: async () => {
    const { currentParams } = get();
    console.log("useDashboard: getWinLoss");
    const { Wins, Losses } = await window.electron.dashboard.getWinLoss(currentParams);
    set({ Wins: Wins, Losses: Losses });
  },
  getSums: async () => {
    const { currentParams } = get();
    console.log("useDashboard: getSums");
    const sums = await window.electron.dashboard.getSums(currentParams);
    set({ Sums: sums });
  },
  getCounts: async () => {
    const { currentParams } = get();
    console.log("useDashboard: getCounts");
    const counts = await window.electron.dashboard.getCounts(currentParams);
    set({ Counts: counts });
  },

  setParams: (params: QueryParams) => {
    set({ currentParams: params });
  },
}));
