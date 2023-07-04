import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import type { CountType } from "dashboard/types";

import { asPercentage } from "../lib/asPercentage";
import { getCharacterIcon } from "../lib/utils";

export interface CountDataTableProps {
  type: string;
  values: CountType[] | undefined;
}

export const CountDataTable: React.FC<CountDataTableProps> = ({ type, values }) => {
  if (!values) {
    return null;
  }
  let array;
  if (values.length > 5) {
    array = values.slice(0, 5);
  } else {
    array = values;
  }

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="left">{type}</TableCell>
            <TableCell align="right">Win Rate</TableCell>
            <TableCell align="right">Total Games</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {array?.map((count, index) => (
            <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell align="left">
                {index + 1}. {count.Name}{" "}
                {type == "Character" ? <img src={getCharacterIcon(count.Name)} height={20}></img> : " "}
              </TableCell>
              <TableCell
                align="right"
                style={{ color: count.Wins >= count.Losses ? "#0255fa" : "#e81010", fontFamily: "Sans-serif" }}
              >
                {asPercentage(count.Wins, count.Count)}%
              </TableCell>
              <TableCell align="right">{count.Count}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
