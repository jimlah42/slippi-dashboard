import styled from "@emotion/styled";
import { FormControl, MenuItem } from "@mui/material";
import MatSelect from "@mui/material/Select";
import React from "react";

import { CHARACTER_NAMES } from "../../replays/utils";
import { getCharacterIcon } from "../lib/utils";

export interface CharacterSelectProps {
  onChange: (value: string) => void;
}

export const CharacterSelect: React.FC<CharacterSelectProps> = ({ onChange }) => {
  const charactersSorted = ["Any"].concat(CHARACTER_NAMES.sort());

  const [curCharacter, setCharacter] = React.useState("Any");

  const handleChange = (event: any) => {
    setCharacter(event.target.value);
    onChange(event.target.value);
  };
  return (
    <FormControl>
      <Select variant="outlined" value={curCharacter} onChange={handleChange}>
        {charactersSorted.map((character: string, index: number) => (
          <MenuItem key={index} value={character}>
            {character}&nbsp; <img src={getCharacterIcon(character)} height={20}></img>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const Select = styled(MatSelect)`
  .MuiOutlinedInput-notchedOutline {
    border-width: 2px;
    border-radius: 10px;
  }
  .MuiSelect-outlined {
    padding: 8px;
    padding-left: 10px;
    padding-right: 50px;
    font-size: 15px;
    color: #000;
  }
  .MuiSelect-icon {
    top: 50%;
    transform: translateY(-50%);
  }
`;
