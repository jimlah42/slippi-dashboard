import { Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import type { DataAvgs, DataCounts } from "dashboard/types";

import { round } from "../lib/round";

export const PlayTimeTable: React.FC<{ Avgs: DataAvgs | null; Counts: DataCounts | null }> = ({ Avgs, Counts }) => {
  return (
    <TableContainer component={Paper}>
      <Typography variant="h6">Overview</Typography>
      <Table size="small">
        <TableBody>
          <TableRow>
            <TableCell align="left">Games Played: </TableCell>
            <TableCell align="left">{Avgs?.TotalGames}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Hours Played:</TableCell>
            <TableCell align="left">
              {Avgs?.AvgDuration != null ? round((Avgs?.AvgDuration / 61 / 60) * Avgs?.TotalGames, 2) : 0}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Unique Opponents: </TableCell>
            <TableCell align="left">{Counts?.OppCodeCount.length}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Character Played: </TableCell>
            <TableCell align="left">{Counts?.CharacterCount.length}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="left">Characters Played Against: </TableCell>
            <TableCell align="left">{Counts?.OppCharacterCount.length}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
