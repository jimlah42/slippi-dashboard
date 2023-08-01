import { Paper, Table, TableBody, TableContainer, TableRow, Typography } from "@mui/material";
import type { DataAvgs } from "dashboard/types";

import { round } from "../lib/round";
import { StatCellsWithComparison } from "./StatCellWithComparison";

export const GeneralStatsTable: React.FC<{ Avgs: DataAvgs | null; PrevAvgs: DataAvgs | null }> = ({
  Avgs,
  PrevAvgs,
}) => {
  return (
    <TableContainer component={Paper}>
      <Typography variant="h6">General Performance Stats</Typography>
      <Table size="small">
        <TableBody>
          <TableRow>
            <StatCellsWithComparison
              title="Opening Conversion Rate"
              period={PrevAvgs?.Period != null ? "Last " + PrevAvgs.Period : ""}
              curValue={Avgs != null ? round((Avgs!.AvgConversions / Avgs!.AvgTotalOpenings) * 100, 2) : 0}
              prevValue={PrevAvgs != null ? round((PrevAvgs!.AvgConversions / PrevAvgs!.AvgTotalOpenings) * 100, 2) : 0}
              suffix="%"
            ></StatCellsWithComparison>
          </TableRow>
          <TableRow>
            <StatCellsWithComparison
              title="Openings per Kill"
              period={PrevAvgs?.Period != null ? "Last " + PrevAvgs.Period : ""}
              curValue={Avgs != null ? round(Avgs!.AvgTotalOpenings / Avgs!.AvgKills, 2) : 0}
              prevValue={PrevAvgs != null ? round(PrevAvgs!.AvgTotalOpenings / PrevAvgs!.AvgKills, 2) : 0}
              suffix=""
              invert={true}
            ></StatCellsWithComparison>
          </TableRow>
          <TableRow>
            <StatCellsWithComparison
              title="Damage per Opening"
              period={PrevAvgs?.Period != null ? "Last " + PrevAvgs.Period : ""}
              curValue={Avgs != null ? round(Avgs!.AvgTotalDmgDone / Avgs!.AvgTotalOpenings, 2) : 0}
              prevValue={PrevAvgs != null ? round(PrevAvgs!.AvgTotalDmgDone / PrevAvgs!.AvgTotalOpenings, 2) : 0}
              suffix=""
            ></StatCellsWithComparison>
          </TableRow>
          <TableRow>
            <StatCellsWithComparison
              title="Inputs per Minute"
              period={PrevAvgs?.Period != null ? "Last " + PrevAvgs.Period : ""}
              curValue={Avgs != null ? round(Avgs!.AvgIPM, 2) : 0}
              prevValue={PrevAvgs != null ? round(PrevAvgs!.AvgIPM, 2) : 0}
              suffix=""
            ></StatCellsWithComparison>
          </TableRow>
          <TableRow>
            <StatCellsWithComparison
              title="L-Cancel Success Rate"
              period={PrevAvgs?.Period != null ? "Last " + PrevAvgs.Period : ""}
              curValue={Avgs != null ? round(Avgs!.AvgLCancelSuccessRate * 100, 2) : 0}
              prevValue={PrevAvgs != null ? round(PrevAvgs!.AvgLCancelSuccessRate * 100, 2) : 0}
              suffix=""
            ></StatCellsWithComparison>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
