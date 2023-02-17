import React from "react";
import { useReplays } from "renderer/lib/hooks/useReplays";
import { useSettings } from "renderer/lib/hooks/useSettings";

import type { FileWithPath } from "../../replays/types";

export const ReplayLoading = () => {
  const replaysPath = useSettings((store) => store.ReplaysPath);
  const playerCode = useSettings((store) => store.PlayerCode);
  React.useEffect(() => {
    console.log("rendered");
    window.electron.replays
      .getNewFiles(replaysPath)
      .then((res) => {
        setState({ ...state, newFiles: res });
      })
      .catch((err) => console.warn(err));
  }, []);

  const LoadingBox = React.memo(function LoadingBox() {
    const progress = useReplays((store) => store.progress);
    return (
      <div>
        {progress?.current}, {progress?.total}
      </div>
    );
  });

  interface State {
    newFiles: FileWithPath[];
    filesLoaded: number;
    filesOmitted: number;
  }

  const [state, setState] = React.useState<State>({ newFiles: [], filesLoaded: 0, filesOmitted: 0 });

  const load = async () => {
    setState({ ...state, newFiles: await window.electron.replays.getNewFiles(replaysPath) });
    console.log("Loading");
    const loaded = await window.electron.replays.loadFiles(state.newFiles, playerCode);

    setState({ ...state, filesLoaded: loaded.filesLoaded, filesOmitted: loaded.filesOmmitted });
    await window.electron.dashboard.refreshDB();
  };
  const check = async () => {
    setState({ ...state, newFiles: await window.electron.replays.getNewFiles(replaysPath) });
  };

  return (
    <div>
      <div>New Files: {state.newFiles.length}</div>
      <button onClick={check}>Check New Files</button>
      <button onClick={load}>Load</button>
      <div>
        Vaild Files: {state.filesLoaded} Files Filtered: {state.filesOmitted}
      </div>
      <button
        onClick={async () => {
          await window.electron.replays.clearData();
          await window.electron.dashboard.refreshDB();
        }}
      >
        Clear Data
      </button>
      <LoadingBox />
    </div>
  );
};
