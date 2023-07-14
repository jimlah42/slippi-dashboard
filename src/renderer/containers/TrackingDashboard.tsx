import { Card, Grid, styled } from "@mui/material";
import React from "react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { useDashboard } from "../lib/hooks/useDashboard";

export const TrackingDashboard = () => {
  const getPeriodAvgs = useDashboard((store) => store.getPeriodAvgs);

  const PeriodAvgs = useDashboard((store) => store.PeriodAvgs);
  const currParams = useDashboard((store) => store.currentParams);

  React.useEffect(() => {
    console.log(currParams);
    getPeriodAvgs().catch(() => console.warn("getPeriodAvgs: err"));
  }, [currParams, getPeriodAvgs]);
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <StyledCard>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart width={500} height={300} data={PeriodAvgs!}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Period" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="TotalGames" stroke="#000" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </StyledCard>
        </Grid>
        <Grid item xs={6}>
          <StyledCard>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart width={500} height={300} data={PeriodAvgs!}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Period" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="AvgKills" stroke="#000" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </StyledCard>
        </Grid>
        <Grid item xs={6}>
          <StyledCard>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart width={500} height={300} data={PeriodAvgs!}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Period" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="AvgOpeningsPerKill" stroke="#000" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
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
