import React from "react";

import { useDashboard } from "../lib/hooks/useDashboard";
import { round } from "../lib/round";

export const OveriewDashboard = () => {
  const getSums = useDashboard((store) => store.getSums);
  const getCounts = useDashboard((store) => store.getCounts);
  const getWinLoss = useDashboard((store) => store.getWinLoss);
  const setParams = useDashboard((store) => store.setParams);

  const Sums = useDashboard((store) => store.Sums);
  const Counts = useDashboard((store) => store.Counts);
  const Wins = useDashboard((store) => store.Wins);
  const Losses = useDashboard((store) => store.Losses);
  const currParams = useDashboard((store) => store.currentParams);

  React.useEffect(() => {
    console.log(currParams);
    getSums().catch(() => console.warn("getSums: err"));
    getCounts().catch(() => console.warn("getCounts: err"));
    getWinLoss().catch(() => console.warn("getWinLoss: err"));
  }, [getSums, getCounts, getWinLoss, currParams]);

  return (
    <div>
      <button onClick={() => setParams({ ...currParams, startDate: "13/02/2023" })}>From Today</button>
      <button onClick={() => setParams({})}>All Time</button>
      <div>
        Wins: {Wins}, Losses: {Losses}
      </div>
      <div>Games Played: {Sums?.TotalGames}</div>
      <div>Hours Played: {Sums?.TotalDuration != null ? round(Sums?.TotalDuration / 60 / 60, 2) : 0}</div>
      <div>Openings: {Sums?.TotalOpenings}</div>
      <div>Openings/Kill: {Sums != null ? round(Sums!.TotalOpenings / Sums!.TotalKills, 2) : 0}</div>
      <div>
        Most Played Character:{" "}
        {Counts != null ? Counts?.CharacterCount[0]?.Name + " Games:" + Counts?.CharacterCount[0]?.Count : "n/a"}
      </div>
    </div>
  );
};
