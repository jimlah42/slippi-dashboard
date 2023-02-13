import type { QueryParams } from "dashboard/types";
import { create } from "zustand";

type StoreState = {
  Wins: number;
  Losses: number;
  totalOpenings: number;
  currentParams: QueryParams;
};

type StoreReducers = {
  getWinLoss: () => Promise<void>;
  getOpenings: () => Promise<void>;
  setParams: (params: QueryParams) => void;
};

const initialState: StoreState = {
  Wins: 0,
  Losses: 0,
  totalOpenings: 0,
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
  getOpenings: async () => {
    const { currentParams } = get();
    console.log("useDashboard: getOpenings");
    const { Openings } = await window.electron.dashboard.getOpenings(currentParams);
    set({ totalOpenings: Openings });
  },

  setParams: (params: QueryParams) => {
    set({ currentParams: params });
  },
}));
