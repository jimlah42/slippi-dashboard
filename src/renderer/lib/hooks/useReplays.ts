import { create } from "zustand";

import type { Progress } from "../../../replays/types";

type StoreState = {
  loading: boolean;
  progress: Progress | null;
};

type StoreReducers = {
  updateProgress: (progress: Progress | null) => void;
};

const initialState: StoreState = {
  loading: false,
  progress: null,
};

export const useReplays = create<StoreState & StoreReducers>((set) => ({
  ...initialState,

  updateProgress: (progress: { current: number; total: number } | null) => {
    console.log("useReplay: ", progress);
    set({ progress });
  },
}));
