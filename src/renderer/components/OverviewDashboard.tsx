import React from "react";

import { useDashboard } from "../lib/hooks/useDashboard";

export const OveriewDashboard = () => {
  const getOpenings = useDashboard((store) => store.getOpenings);
  const getWinLoss = useDashboard((store) => store.getWinLoss);

  React.useEffect(() => {
    console.log("rendered");
    getOpenings().catch(() => console.warn("getOpenings: err"));
    getWinLoss().catch(() => console.warn("getWinLoss: err"));
  }, [getOpenings, getWinLoss]);

  const Openings = useDashboard((store) => store.totalOpenings);
  const Wins = useDashboard((store) => store.Wins);
  const Losses = useDashboard((store) => store.Losses);
  return (
    <div>
      <div>
        Wins: {Wins}, Losses: {Losses}
      </div>
      <div>Openings: {Openings}</div>
    </div>
  );
};
