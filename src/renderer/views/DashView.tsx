import React from "react";

import { OveriewDashboard } from "../components/OverviewDashboard";
import { PersistentNotification } from "../components/PersistentNotifcation";
import { MainMenu } from "../containers/MainMenu";

export const DashView: React.FC = () => {
  return (
    <div>
      <MainMenu />
      <OveriewDashboard />
      <PersistentNotification />
    </div>
  );
};
