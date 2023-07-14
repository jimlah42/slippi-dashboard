import styled from "@emotion/styled";
import { Card, Paper, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import React from "react";

import { CharacterSelect } from "../components/CharacterSelect";
import { WinLoss } from "../components/charts/WinLoss";
import { CountDataTable } from "../components/CountDataTable";
import { GeneralStatsTable } from "../components/GeneralStatsTable";
import { PlayTimeTable } from "../components/PlayTimeTable";
import { StageWinLoss } from "../components/StageWinLoss";
import { useDashboard } from "../lib/hooks/useDashboard";
import { daysAgo, startOfCurrent } from "../lib/time";

export const OveriewDashboard = () => {
  const getPrevAvgs = useDashboard((store) => store.getPrevAvgs);
  const getAvgs = useDashboard((store) => store.getAvgs);
  const getPrevCounts = useDashboard((store) => store.getPrevCounts);
  const getCounts = useDashboard((store) => store.getCounts);
  const getWinLoss = useDashboard((store) => store.getWinLoss);
  const setParams = useDashboard((store) => store.setParams);

  const PrevAvgs = useDashboard((store) => store.PrevAvgs);
  const Avgs = useDashboard((store) => store.Avgs);
  const PrevCounts = useDashboard((store) => store.PrevCounts);
  const Counts = useDashboard((store) => store.Counts);
  const Wins = useDashboard((store) => store.Wins);
  const Losses = useDashboard((store) => store.Losses);
  const currParams = useDashboard((store) => store.currentParams);

  React.useEffect(() => {
    console.log(currParams);
    getPrevAvgs().catch(() => console.warn("getPrevAvgs: err"));
    getAvgs().catch(() => console.warn("getAvgs: err"));
    getPrevCounts().catch(() => console.warn("getPrevCounts: err"));
    getCounts().catch(() => console.warn("getCounts: err"));
    getWinLoss().catch(() => console.warn("getWinLoss: err"));
  }, [getAvgs, getCounts, getWinLoss, currParams, getPrevAvgs, getPrevCounts]);

  const handleCharChange = (value: string) => {
    if (value != "Any") {
      setParams({ ...currParams, Character: value });
    } else {
      setParams({ ...currParams, Character: undefined });
    }
  };

  const handleOppCharChange = (value: string) => {
    if (value != "Any") {
      setParams({ ...currParams, OppCharacter: value });
    } else {
      setParams({ ...currParams, OppCharacter: undefined });
    }
  };

  const [date, setDate] = React.useState<string | null>("all");
  const handleDate = (_event: React.MouseEvent<HTMLElement>, newDate: string | null) => {
    setDate(newDate);
    switch (newDate) {
      case "all":
        setParams({ ...currParams, NoOfGames: undefined, startDate: undefined, period: undefined });
        break;
      case "week":
        setParams({ ...currParams, NoOfGames: undefined, startDate: daysAgo(7), period: "week" });
        break;
      case "month":
        setParams({ ...currParams, NoOfGames: undefined, startDate: startOfCurrent("month"), period: "month" });
        break;
      case "year":
        setParams({ ...currParams, NoOfGames: undefined, startDate: startOfCurrent("year"), period: "year" });
        break;
      case "ten":
        setParams({ ...currParams, NoOfGames: 10, startDate: undefined, period: undefined });
        break;
      default:
        setParams({ ...currParams, NoOfGames: undefined, startDate: undefined, period: undefined });
        break;
    }
  };

  return (
    <div>
      <div>
        <Paper elevation={0} sx={{ display: "flex", flexWrap: "wrap" }}>
          <ToggleButtonGroup value={date} exclusive onChange={handleDate} color="primary">
            <ToggleButton value="all">All</ToggleButton>
            <ToggleButton value="week">Week</ToggleButton>
            <ToggleButton value="month">Month</ToggleButton>
            <ToggleButton value="year">Year</ToggleButton>
            <ToggleButton value="ten">Last 10 games</ToggleButton>
          </ToggleButtonGroup>
          <CharacterSelect onChange={handleCharChange}></CharacterSelect>
          <Typography>&nbsp;vs&nbsp;</Typography>
          <CharacterSelect onChange={handleOppCharChange}></CharacterSelect>
        </Paper>
      </div>

      <Grid container spacing={1}>
        <Grid item xs={3}>
          <StyledCard>
            <PlayTimeTable Avgs={Avgs} PrevAvgs={PrevAvgs} Counts={Counts} PrevCounts={PrevCounts}></PlayTimeTable>
          </StyledCard>
        </Grid>
        <Grid item xs={3}>
          <StyledCard>
            <Typography variant="h6">Win Rate</Typography>
            <WinLoss Wins={Wins} Losses={Losses}></WinLoss>
          </StyledCard>
        </Grid>
        <Grid item xs={6}>
          <StyledCard>
            <GeneralStatsTable Avgs={Avgs} PrevAvgs={PrevAvgs}></GeneralStatsTable>
          </StyledCard>
        </Grid>
        <Grid item xs={4}>
          <StyledCard>
            <Typography variant="h6">Most Played Characters:</Typography>
            <CountDataTable type="Character" values={Counts?.CharacterCount}></CountDataTable>
          </StyledCard>
        </Grid>
        <Grid item xs={4}>
          <StyledCard>
            <Typography variant="h6">Most Played Against Characters:</Typography>
            <CountDataTable type="Character" values={Counts?.OppCharacterCount}></CountDataTable>
          </StyledCard>
        </Grid>
        <Grid item xs={4}>
          <StyledCard>
            <Typography variant="h6">Most Played Opponents</Typography>
            <CountDataTable type="Name" values={Counts?.OppCodeCount}></CountDataTable>
          </StyledCard>
        </Grid>
        <Grid item xs={12}>
          <StyledCard>
            <Typography variant="h6">Most Played Stages:</Typography>
            <StageWinLoss StageCounts={Counts?.StageCount}></StageWinLoss>
          </StyledCard>
        </Grid>
      </Grid>
    </div>
  );
};

const StyledCard = styled(Card)`
  width: 100%;
  height: 100%;
`;
