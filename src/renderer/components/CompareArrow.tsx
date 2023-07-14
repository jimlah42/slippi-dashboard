import { HorizontalRule, KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { grey } from "@mui/material/colors";

export const CompareArrow: React.FC<{ value: number; prevValue: number; invert: boolean }> = ({
  value,
  prevValue,
  invert,
}) => {
  let v1;
  let v2;
  if (invert) {
    v1 = prevValue;
    v2 = value;
  } else {
    v1 = value;
    v2 = prevValue;
  }
  if (v1 > v2) {
    return <KeyboardArrowUp sx={{ color: "#0255fa" }}></KeyboardArrowUp>;
  } else if (v1 < v2) {
    return <KeyboardArrowDown sx={{ color: "#e81010" }}></KeyboardArrowDown>;
  }
  return <HorizontalRule sx={{ color: grey }}></HorizontalRule>;
};
