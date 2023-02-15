import { throttle } from "lodash";
import React from "react";
import { useReplays } from "renderer/lib/hooks/useReplays";

import { useSettings } from "./useSettings";

export const useAppListeners = () => {
  const updateProgress = useReplays((store) => store.updateProgress);
  const throttledUpdateProgress = throttle(updateProgress, 50);
  React.useEffect(() => {
    return window.electron.replays.onReplayLoadProgressUpdate(throttledUpdateProgress);
  }, [throttledUpdateProgress]);

  const updateSettings = useSettings((store) => store.updateSettings);
  React.useEffect(() => {
    return window.electron.settings.onSettingsUpdated(updateSettings);
  }, [updateSettings]);
};
