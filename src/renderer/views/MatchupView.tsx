import React from "react";

import { MainMenu } from "../containers/MainMenu";
import { MatchupDashboard } from "../containers/MatchupDashboard";

export const MatchupView: React.FC = () => {
  return (
    <div>
      <MainMenu />
      <MatchupDashboard />
    </div>
  );
};
