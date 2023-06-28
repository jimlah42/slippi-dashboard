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
  const playerCode = useSettings((store) => store.PlayerCodes);
  const setPlayerCode = async (playerCodes: string[]) => {
    await window.electron.settings.setPlayerCodes(playerCodes);
    await window.electron.replays.clearFiltered();
    await window.electron.dashboard.refreshDB();
  };
  const removePlayerCode = async (playerCodes: string[], playerCode: string) => {
    console.log(playerCode);
    await window.electron.settings.setPlayerCodes(playerCodes);
    await window.electron.replays.clearCode(playerCode);
    await window.electron.dashboard.refreshDB();
  };
  return [playerCode, setPlayerCode, removePlayerCode] as const;
};

export const useReplaysPath = () => {
  const replaysPath = useSettings((store) => store.ReplaysPath);
  const setReplaysPath = async (replaysPath: string) => {
    await window.electron.settings.setReplaysPath(replaysPath);
    await window.electron.replays.clearData();
    await window.electron.dashboard.refreshDB();
  };
  return [replaysPath, setReplaysPath] as const;
};
