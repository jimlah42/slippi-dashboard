import React from "react";

import { OveriewDashboard } from "../components/OverviewDashboard";
import { MainMenu } from "../containers/MainMenu";

export const DashView: React.FC = () => {
  return (
    <div>
      <MainMenu />
      <OveriewDashboard />
    </div>
  );
};
