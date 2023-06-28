import type { CountType } from "dashboard/types";
import React from "react";

import { asPercentage } from "../lib/asPercentage";
import { useDashboard } from "../lib/hooks/useDashboard";
import { round } from "../lib/round";
import { daysAgo } from "../lib/time";

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

  const ListCounts = ({ countArray }: { countArray: CountType[] | undefined }) => {
    if (!countArray) {
      return null;
    }

    const array = countArray;
    return (
      <div>
        <ol>
          {array.map((character) => (
            <li key={character.Name}>
              {character.Name} {asPercentage(character.Wins, character.Count)}% ({character.Count})
            </li>
          ))}
        </ol>
      </div>
    );
  };

  return (
    <div>
      <button onClick={() => setParams({ ...currParams, NoOfGames: undefined, startDate: daysAgo(7) })}>
        Last 7 Days
      </button>
      <button onClick={() => setParams({ ...currParams, NoOfGames: undefined, startDate: daysAgo(30) })}>
        Last 30 Days
      </button>
      <button onClick={() => setParams({})}>All Time</button>
      <button onClick={() => setParams({ NoOfGames: 10 })}>Last 10 Games</button>
      <div>
        Wins: {Wins}, Losses: {Losses}
      </div>
      <div>Games Played: {Avgs?.TotalGames}</div>
      <div>
        Hours Played: {Avgs?.AvgDuration != null ? round((Avgs?.AvgDuration / 60 / 60) * Avgs?.TotalGames, 2) : 0}
      </div>
      <div>
        Opening Convertion Rate: {Avgs != null ? round(Avgs!.AvgConversions / Avgs!.AvgTotalOpenings, 2) * 100 : 0}%
      </div>
      <div>Openings/Kill: {Avgs != null ? round(Avgs!.AvgTotalOpenings / Avgs!.AvgKills, 2) : 0}</div>
      <div>Inputs per Minute {Avgs != null ? round(Avgs!.AvgIPM, 2) : 0}</div>
      <div>LCancel Success Rate: {Avgs != null ? round(Avgs!.AvgLCancelSuccessRate, 2) * 100 : 0}%</div>
      <div>Most Played Characters:</div>
      <ListCounts countArray={Counts?.CharacterCount} />
      <div>Most Played Against Characters:</div>
      <ListCounts countArray={Counts?.OppCharacterCount} />
      <div>Most Played Opponents</div>
      <ListCounts countArray={Counts?.OppCodeCount} />
      <div>Most Played Stages:</div>
      <ListCounts countArray={Counts?.StageCount} />
    </div>
  );
};
