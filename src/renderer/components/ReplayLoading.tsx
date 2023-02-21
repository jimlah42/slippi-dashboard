import React from "react";
import { useReplays } from "renderer/lib/hooks/useReplays";
import { useSettings } from "renderer/lib/hooks/useSettings";

// import type { FileWithPath } from "../../replays/types";

export const ReplayLoading = () => {
  // interface State {
  //   newFiles: FileWithPath[];
  //   filesLoaded: number;
  //   filesOmitted: number;
  // }

  // const [state, setState] = React.useState<State>({ newFiles: [], filesLoaded: 0, filesOmitted: 0 });

  const vaildFiles = useReplays((store) => store.vaildFiles);
  const filteredFiles = useReplays((store) => store.filteredFiles);
  const replaysPath = useSettings((store) => store.ReplaysPath);
  const playerCode = useSettings((store) => store.PlayerCode);
  const newFiles = useReplays((store) => store.newFiles);

  const getNewFiles = useReplays((store) => store.checkNewFiles);
  const loadFiles = useReplays((store) => store.loadFiles);

  React.useEffect(() => {
    console.log("rendered");
    getNewFiles(replaysPath).catch(() => console.warn("getNewFiles err"));
  }, [getNewFiles, replaysPath]);

  const LoadingBox = React.memo(function LoadingBox() {
    const progress = useReplays((store) => store.progress);
    return (
      <div>
        {progress?.current}, {progress?.total}
      </div>
    );
  });

  const load = async () => {
    console.log("Loading");
    loadFiles(newFiles, playerCode).catch(() => console.warn("loadFiles err"));
    // const loaded = await window.electron.replays.loadFiles(newFiles, playerCode);

    // setState({ ...state, filesLoaded: loaded.filesLoaded, filesOmitted: loaded.filesOmmitted });
    // await window.electron.dashboard.refreshDB();
  };
  const check = async () => {
    getNewFiles(replaysPath).catch(() => console.warn("getNewFiles err"));
  };

  return (
    <div>
      <div>New Files: {newFiles.length}</div>
      <button onClick={check}>Check New Files</button>
      <button onClick={load}>Load</button>
      <div>
        Vaild Files: {vaildFiles} Files Filtered: {filteredFiles}
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
