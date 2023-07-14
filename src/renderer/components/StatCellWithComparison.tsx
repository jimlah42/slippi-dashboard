import { type TooltipProps, styled, TableCell, Tooltip, tooltipClasses, Typography } from "@mui/material";

import { CompareArrow } from "./CompareArrow";

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

interface StatCellsWithComparisonProps {
  title: string;
  period: string;
  curValue: number;
  prevValue: number;
  suffix: string;
  invert?: boolean;
}

export const StatCellsWithComparison: React.FC<StatCellsWithComparisonProps> = ({
  title,
  period,
  curValue,
  prevValue,
  suffix,
  invert,
}) => {
  return (
    <>
      <TableCell align="left">{title}</TableCell>
      <HtmlTooltip
        title={
          <>
            <Typography>
              {period}: {prevValue}
              {suffix}
            </Typography>
          </>
        }
      >
        <TableCell align="left">
          {curValue}
          {suffix}
          <CompareArrow value={curValue} prevValue={prevValue} invert={invert ? invert : false}></CompareArrow>
        </TableCell>
      </HtmlTooltip>
    </>
  );
};

StatCellsWithComparison.defaultProps = {
  invert: false,
};
