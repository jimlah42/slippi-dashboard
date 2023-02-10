import { throttle } from "lodash";
import React from "react";
import { useReplays } from "renderer/lib/hooks/useReplays";

export const useAppListeners = () => {
  const updateProgress = useReplays((store) => store.updateProgress);
  const throttledUpdateProgress = throttle(updateProgress, 50);
  React.useEffect(() => {
    return window.electron.replays.onReplayLoadProgressUpdate(throttledUpdateProgress);
  }, [throttledUpdateProgress]);
};
