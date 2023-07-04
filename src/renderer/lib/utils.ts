import unknownCharacterIcon from "../styles/images/unknown.png";

const characterIcons = require.context("../styles/images/characters", true);
const stageIcons = require.context("../styles/images/stages", true);

export const getCharacterIcon = (characterName: string | null): string => {
  if (characterName !== null) {
    try {
      return characterIcons(`./${characterName}/0/stock.png`);
    } catch (err) {
      console.warn(`Failed to find stock icon for character ${characterName}`);
    }
  }

  return unknownCharacterIcon;
};

export const getStageIcon = (stageName: string): string => {
  try {
    return stageIcons(`./${stageName}.png`);
  } catch (err) {
    console.warn(`Failed to find stage icon for stage ${stageName}`);
  }
  return unknownCharacterIcon;
};
