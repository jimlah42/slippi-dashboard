import { Box, Stack, Typography } from "@mui/material";
import type { CountType } from "dashboard/types";

import { asPercentage } from "../lib/asPercentage";
import { getStageIcon } from "../lib/utils";

export const StageWinLoss: React.FC<{ StageCounts: CountType[] | undefined }> = ({ StageCounts }) => {
  if (!StageCounts) {
    return null;
  }
  return (
    <Stack spacing={{ xs: 1, sm: 2 }} direction="row" justifyContent="center">
      {StageCounts.map((stage, index) => (
        <Box key={index} justifyContent="center">
          <img src={getStageIcon(stage.Name)} height={150}></img>
          <Typography
            justifyContent="centre"
            style={{ color: stage.Wins >= stage.Losses ? "#0255fa" : "#e81010", fontFamily: "Sans-serif" }}
          >
            Win Rate: {asPercentage(stage.Wins, stage.Count)}%
          </Typography>
          <Typography justifyContent="centre">Total Games: {stage.Count}</Typography>
        </Box>
      ))}
    </Stack>
  );
};
