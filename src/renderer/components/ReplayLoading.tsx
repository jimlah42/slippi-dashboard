import React from "react";
import { useReplays } from "renderer/lib/hooks/useReplays";

export const ReplayLoading = () => {
  React.useEffect(() => {
    console.log("rendered");
    window.electron.replays
      .getNewFiles("src/tests/slpLarge")
      .then((res) => {
        setState({ newFiles: res });
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
    newFiles: string[];
  }
  const [state, setState] = React.useState<State>({ newFiles: [] });

  const load = async () => {
    setState({ newFiles: await window.electron.replays.getNewFiles("src/tests/slpLarge") });
    console.log("Loading");
    await window.electron.replays.loadFiles(state.newFiles);
    await window.electron.dashboard.refreshDB();
  };
  const check = async () => {
    setState({ newFiles: await window.electron.replays.getNewFiles("src/tests/slpLarge") });
  };

  return (
    <div>
      <div>New Files: {state.newFiles.length}</div>
      <button onClick={check}>Check New Files</button>
      <button onClick={load}>Load</button>
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
