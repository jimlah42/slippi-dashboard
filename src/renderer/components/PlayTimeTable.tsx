import { Paper, Table, TableBody, TableContainer, TableRow, Typography } from "@mui/material";
import type { DataAvgs, DataCounts } from "dashboard/types";

import { round } from "../lib/round";
import { StatCellsWithComparison } from "./StatCellWithComparison";

export const PlayTimeTable: React.FC<{
  Avgs: DataAvgs | null;
  PrevAvgs: DataAvgs | null;
  Counts: DataCounts | null;
  PrevCounts: DataCounts | null;
}> = ({ Avgs, PrevAvgs, Counts, PrevCounts }) => {
  return (
    <TableContainer component={Paper}>
      <Typography variant="h6">Overview</Typography>
      <Table size="small">
        <TableBody>
          <TableRow>
            <StatCellsWithComparison
              title="Games Played:"
              period={PrevAvgs?.Period != null ? PrevAvgs.Period : ""}
              curValue={Avgs?.TotalGames ? Avgs.TotalGames : 0}
              prevValue={PrevAvgs?.TotalGames ? PrevAvgs.TotalGames : 0}
              suffix=""
            ></StatCellsWithComparison>
          </TableRow>
          <TableRow>
            <StatCellsWithComparison
              title="Hours Played:"
              period={PrevAvgs?.Period != null ? PrevAvgs.Period : ""}
              curValue={Avgs?.AvgDuration != null ? round((Avgs?.AvgDuration / 61 / 60) * Avgs?.TotalGames, 2) : 0}
              prevValue={
                PrevAvgs?.AvgDuration != null ? round((PrevAvgs?.AvgDuration / 61 / 60) * PrevAvgs?.TotalGames, 2) : 0
              }
              suffix=""
            ></StatCellsWithComparison>
          </TableRow>
          <TableRow>
            <StatCellsWithComparison
              title="Unique Opponents:"
              period={PrevAvgs?.Period != null ? PrevAvgs.Period : ""}
              curValue={Counts?.OppCodeCount ? Counts?.OppCodeCount.length : 0}
              prevValue={PrevCounts?.OppCodeCount ? PrevCounts?.OppCodeCount.length : 0}
              suffix=""
            ></StatCellsWithComparison>
          </TableRow>
          <TableRow>
            <StatCellsWithComparison
              title="Character Played: "
              period={PrevAvgs?.Period != null ? PrevAvgs.Period : ""}
              curValue={Counts?.CharacterCount ? Counts?.CharacterCount.length : 0}
              prevValue={PrevCounts?.CharacterCount ? PrevCounts?.CharacterCount.length : 0}
              suffix=""
            ></StatCellsWithComparison>
          </TableRow>
          <TableRow>
            <StatCellsWithComparison
              title="Characters Played Against: "
              period={PrevAvgs?.Period != null ? PrevAvgs.Period : ""}
              curValue={Counts?.OppCharacterCount ? Counts?.OppCharacterCount.length : 0}
              prevValue={PrevCounts?.OppCharacterCount ? PrevCounts?.OppCharacterCount.length : 0}
              suffix=""
            ></StatCellsWithComparison>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
