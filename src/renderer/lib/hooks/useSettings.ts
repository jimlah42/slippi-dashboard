import type { AppSettings } from "settings/types";
import { create } from "zustand";
import { combine } from "zustand/middleware";

const initialState = window.electron.settings.getAppSettingsSync();
console.log("Initial settings: " + initialState);

export const useSettings = create(
  combine(
    {
      ...initialState,
    },
    (set) => ({
      updateSettings: (settings: AppSettings) => {
        console.log("useSettings: update: " + settings.ReplaysPath);
        set(() => settings);
      },
    }),
  ),
);

export const usePlayerCode = () => {
  const playerCode = useSettings((store) => store.PlayerCode);
  const setPlayerCode = async (playerCode: string) => {
    await window.electron.settings.setPlayerCode(playerCode);
  };
  return [playerCode, setPlayerCode] as const;
};

export const useReplaysPath = () => {
  const replaysPath = useSettings((store) => store.ReplaysPath);
  const setReplaysPath = async (replaysPath: string) => {
    await window.electron.settings.setReplaysPath(replaysPath);
  };
  return [replaysPath, setReplaysPath] as const;
};
