import React from "react";

import { MainMenu } from "../containers/MainMenu";
import { TrackingDashboard } from "../containers/TrackingDashboard";

export const TrackingView: React.FC = () => {
  return (
    <div>
      <MainMenu />
      <TrackingDashboard />
    </div>
  );
};
