import type { DataAvgs, DataCounts, QueryParams } from "dashboard/types";
import { create } from "zustand";

import { startOfCurrent, startOfPrevious } from "../time";

type StoreState = {
  Wins: number;
  Losses: number;
  PeriodAvgs: DataAvgs[] | null;
  PrevAvgs: DataAvgs | null;
  Avgs: DataAvgs | null;
  PrevCounts: DataCounts | null;
  Counts: DataCounts | null;
  currentParams: QueryParams;
};

type StoreReducers = {
  getWinLoss: () => Promise<void>;
  getPeriodAvgs: () => Promise<void>;
  getPrevAvgs: () => Promise<void>;
  getAvgs: () => Promise<void>;
  getPrevCounts: () => Promise<void>;
  getCounts: () => Promise<void>;
  setParams: (params: QueryParams) => void;
};

const initialState: StoreState = {
  Wins: 0,
  Losses: 0,
  PeriodAvgs: null,
  PrevAvgs: null,
  Avgs: null,
  PrevCounts: null,
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
  getPeriodAvgs: async () => {
    const { currentParams } = get();
    console.log("useDashboard: getPeriodAvgs");
    const avgs = await window.electron.dashboard.getPeriodAvgs(currentParams);
    set({ PeriodAvgs: avgs });
  },

  getPrevAvgs: async () => {
    const { currentParams } = get();
    console.log("useDashboard: getPrevAvgs");
    let period;
    if (!currentParams.period) {
      period = "none";
    } else {
      period = currentParams.period;
    }
    const modParams = { ...currentParams, startDate: startOfPrevious(period), endDate: startOfCurrent(period) };
    const avgs = await window.electron.dashboard.getAvgs(modParams);
    set({ PrevAvgs: avgs });
  },
  getAvgs: async () => {
    const { currentParams } = get();
    console.log("useDashboard: getAvgs");
    const avgs = await window.electron.dashboard.getAvgs(currentParams);
    set({ Avgs: avgs });
  },
  getPrevCounts: async () => {
    const { currentParams } = get();
    console.log("useDashboard: getPrevCounts");

    let period;
    if (!currentParams.period) {
      period = "none";
    } else {
      period = currentParams.period;
    }
    const modParams = { ...currentParams, startDate: startOfPrevious(period), endDate: startOfCurrent(period) };

    const counts = await window.electron.dashboard.getCounts(modParams);
    set({ PrevCounts: counts });
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
