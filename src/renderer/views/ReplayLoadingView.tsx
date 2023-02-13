import React from "react";

import { ReplayLoading } from "../components/ReplayLoading";
import { MainMenu } from "../containers/MainMenu";

export const ReplayLoadingView: React.FC = () => {
  return (
    <div>
      <MainMenu />
      <ReplayLoading />
    </div>
  );
};
