const STAGE_NAMES = {
  2: "Fountain of Dreams",
  3: "Pokémon Stadium",
  8: "Yoshi's Story",
  28: "Dream Land N64",
  31: "Battlefield",
  32: "Final Destination",
};

export function getStageNameByIndex(index: number): string {
  return STAGE_NAMES[index];
}
