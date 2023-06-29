import React from "react";

import { CHARACTER_NAMES } from "../../replays/utils";

export interface CharacterSelectProps {
  onChange: (value: string) => void;
}

export const CharacterSelect: React.FC<CharacterSelectProps> = ({ onChange }) => {
  const charactersSorted = ["Any"].concat(CHARACTER_NAMES.sort());

  const [curCharacter, setCharacter] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCharacter(event.target.value);
    onChange(event.target.value);
  };
  return (
    <div>
      <select value={curCharacter} onChange={handleChange}>
        {charactersSorted.map((character: string, index: number) => (
          <option key={index} value={character}>
            {character}
          </option>
        ))}
      </select>
    </div>
  );
};
