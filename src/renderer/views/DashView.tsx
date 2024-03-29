import React from "react";

import { MainMenu } from "../containers/MainMenu";
import { OveriewDashboard } from "../containers/OverviewDashboard";

export const DashView: React.FC = () => {
  return (
    <div>
      <MainMenu />
      <OveriewDashboard />
    </div>
  );
};
