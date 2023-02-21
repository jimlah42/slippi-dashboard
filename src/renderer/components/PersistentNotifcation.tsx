import { css } from "@emotion/react";
import styled from "@emotion/styled";
import ButtonBase from "@mui/material/ButtonBase";
import React, { useState } from "react";

import { useDashboard } from "../lib/hooks/useDashboard";
import { useReplays } from "../lib/hooks/useReplays";
import { useSettings } from "../lib/hooks/useSettings";

export const PersistentNotification: React.FC = () => {
  const loading = useReplays((store) => store.loading);

  const vaildFiles = useReplays((store) => store.vaildFiles);
  const filteredFiles = useReplays((store) => store.filteredFiles);
  const replaysPath = useSettings((store) => store.ReplaysPath);
  const playerCode = useSettings((store) => store.PlayerCode);
  const newFiles = useReplays((store) => store.newFiles);
  const progress = useReplays((store) => store.progress);
  const setParams = useDashboard((store) => store.setParams);

  const getNewFiles = useReplays((store) => store.checkNewFiles);
  const loadFiles = useReplays((store) => store.loadFiles);

  const [Done, setDone] = useState(true);

  React.useEffect(() => {
    console.log("rendered");
    getNewFiles(replaysPath).catch(() => console.warn("getNewFiles err"));
  }, [getNewFiles, replaysPath]);

  if (loading) {
    if (Done) {
      setDone(false);
    }

    return (
      <Outer>
        <div
          css={css`
            display: flex;
            justify-content: center;
          `}
        >
          Loading files: {progress?.current} of {progress?.total} ...
        </div>
      </Outer>
    );
  }
  if (Done && newFiles.length == 0) {
    // setParams({});
    return null;
  }

  if (newFiles.length == 0 && !loading) {
    return (
      <Outer>
        <div>
          Vaild Files: {vaildFiles} Files Filtered: {filteredFiles}
        </div>
        <ButtonBase
          onClick={() => {
            setDone(true);
            setParams({});
          }}
        >
          Ok
        </ButtonBase>
      </Outer>
    );
  }
  return (
    <Outer>
      <div
        css={css`
          display: flex;
          justify-content: center;
        `}
      >
        <span
          css={css`
            margin-right: 10px;
          `}
        >
          Found {newFiles.length} new files
        </span>
        <RestartButton onClick={() => loadFiles(newFiles, playerCode)}>LoadFiles</RestartButton>
      </div>
    </Outer>
  );
};

const Outer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  height: 30px;
  background-color: light-blue;
  text-align: center;
  font-size: 14px;
`;

const RestartButton = styled(ButtonBase)`
  font-weight: 500;
  padding: 0 5px;
  &:hover {
    opacity: 0.8;
  }
`;
