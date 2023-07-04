import { Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import type { DataAvgs } from "dashboard/types";

import { round } from "../lib/round";

export const GeneralStatsTable: React.FC<{ Avgs: DataAvgs | null }> = ({ Avgs }) => {
  return (
    <TableContainer component={Paper}>
      <Typography variant="h6">General Performance Stats</Typography>
      <Table size="small">
        <TableBody>
          <TableRow>
            <TableCell align="left">Opening Conversion Rate</TableCell>
            <TableCell align="left">
              {Avgs != null ? round((Avgs!.AvgConversions / Avgs!.AvgTotalOpenings) * 100, 2) : 0}%
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Openings per Kill</TableCell>
            <TableCell align="left">{Avgs != null ? round(Avgs!.AvgTotalOpenings / Avgs!.AvgKills, 2) : 0}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Damage per Opening</TableCell>
            <TableCell align="left">
              {Avgs != null ? round(Avgs!.AvgTotalDmgDone / Avgs!.AvgTotalOpenings, 2) : 0}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Inputs per Minute</TableCell>
            <TableCell align="left">{Avgs != null ? round(Avgs!.AvgIPM, 2) : 0}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">L-Cancel Success Rate</TableCell>
            <TableCell align="left">{Avgs != null ? round(Avgs!.AvgLCancelSuccessRate * 100, 2) : 0}%</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
