import React from "react";

import { useDashboard } from "../lib/hooks/useDashboard";

export const OveriewDashboard = () => {
  const getSums = useDashboard((store) => store.getSums);
  const getCounts = useDashboard((store) => store.getCounts);
  const getWinLoss = useDashboard((store) => store.getWinLoss);

  React.useEffect(() => {
    console.log("rendered");
    getSums().catch(() => console.warn("getSums: err"));
    getCounts().catch(() => console.warn("getCounts: err"));
    getWinLoss().catch(() => console.warn("getWinLoss: err"));
  }, [getSums, getCounts, getWinLoss]);

  const Sums = useDashboard((store) => store.Sums);
  const Counts = useDashboard((store) => store.Counts);
  const Wins = useDashboard((store) => store.Wins);
  const Losses = useDashboard((store) => store.Losses);
  return (
    <div>
      <div>
        Wins: {Wins}, Losses: {Losses}
      </div>
      <div>Openings: {Sums?.TotalOpenings}</div>
      <div>Openings/Kill: {Sums != null ? Sums!.TotalOpenings / Sums!.TotalKills : 0}</div>
      <div>
        Most Played Character:{" "}
        {Counts != null ? Counts.CharacterCount[0].Name + " Games:" + Counts.CharacterCount[0].Count : "n/a"}
      </div>
    </div>
  );
};
