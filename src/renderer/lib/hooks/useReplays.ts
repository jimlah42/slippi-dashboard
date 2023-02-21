import { create } from "zustand";

import type { FileWithPath, Progress } from "../../../replays/types";

type StoreState = {
  loading: boolean;
  vaildFiles: number;
  filteredFiles: number;
  newFiles: FileWithPath[];
  progress: Progress | null;
  close: boolean;
};

type StoreReducers = {
  checkNewFiles: (replaysPath: string) => Promise<void>;
  loadFiles: (files: FileWithPath[], playerCode: string) => Promise<void>;
  updateProgress: (progress: Progress | null) => void;
  setClose: (close: boolean) => void;
};

const initialState: StoreState = {
  loading: false,
  vaildFiles: 0,
  filteredFiles: 0,
  newFiles: [],
  progress: null,
  close: false,
};

export const useReplays = create<StoreState & StoreReducers>((set, get) => ({
  ...initialState,

  checkNewFiles: async (replayPath: string) => {
    const result = await window.electron.replays.getNewFiles(replayPath);
    set({ newFiles: result });
  },

  loadFiles: async (files: FileWithPath[], playerCode: string) => {
    const { loading } = get();
    if (loading) {
      console.log("Already loading");
      return;
    }

    set({ loading: true });

    const result = await window.electron.replays.loadFiles(files, playerCode);
    set({ vaildFiles: result.filesLoaded, filteredFiles: result.filesOmmitted });
    await window.electron.dashboard.refreshDB();
    set({ loading: false });
    set({ newFiles: [] });
  },

  updateProgress: (progress: { current: number; total: number } | null) => {
    console.log("useReplay: ", progress);
    set({ progress });
  },

  setClose: (close: boolean) => {
    set({ close });
  },
}));
