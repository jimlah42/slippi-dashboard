import React from "react";

import { useDashboard } from "../lib/hooks/useDashboard";
import { round } from "../lib/round";

export const OveriewDashboard = () => {
  const getAvgs = useDashboard((store) => store.getAvgs);
  const getCounts = useDashboard((store) => store.getCounts);
  const getWinLoss = useDashboard((store) => store.getWinLoss);
  const setParams = useDashboard((store) => store.setParams);

  const Avgs = useDashboard((store) => store.Avgs);
  const Counts = useDashboard((store) => store.Counts);
  const Wins = useDashboard((store) => store.Wins);
  const Losses = useDashboard((store) => store.Losses);
  const currParams = useDashboard((store) => store.currentParams);

  React.useEffect(() => {
    console.log(currParams);
    getAvgs().catch(() => console.warn("getAvgs: err"));
    getCounts().catch(() => console.warn("getCounts: err"));
    getWinLoss().catch(() => console.warn("getWinLoss: err"));
  }, [getAvgs, getCounts, getWinLoss, currParams]);

  return (
    <div>
      <button onClick={() => setParams({ ...currParams, startDate: "13/02/2023" })}>From Today</button>
      <button onClick={() => setParams({})}>All Time</button>
      <div>
        Wins: {Wins}, Losses: {Losses}
      </div>
      <div>Games Played: {Avgs?.TotalGames}</div>
      <div>
        Hours Played: {Avgs?.AvgDuration != null ? round((Avgs?.AvgDuration / 60 / 60) * Avgs?.TotalGames, 2) : 0}
      </div>
      <div>Openings/Kill: {Avgs != null ? round(Avgs!.AvgTotalOpenings / Avgs!.AvgKills, 2) : 0}</div>
      <div>Inputs per Minute {Avgs != null ? round(Avgs!.AvgIPM, 2) : 0}</div>
      <div>LCancel Success Rate: {Avgs != null ? round(Avgs!.AvgLCancelSuccessRate, 2) * 100 : 0}%</div>
      <div>
        Most Played Character:{" "}
        {Counts != null ? Counts?.CharacterCount[0]?.Name + " Games: " + Counts?.CharacterCount[0]?.Count : "n/a"}
      </div>
    </div>
  );
};
