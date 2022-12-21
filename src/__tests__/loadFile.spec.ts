import { loadFile } from "replays/loadFile";
import type { GameStats } from "replays/types";

// eslint-disable-next-line jest/no-mocks-import
import { game1 } from "../__mocks__/game1";

describe("When loading base test file", () => {
  it("should return correct stats", async () => {
    const result: GameStats | null = await loadFile("src/__tests__/slp/Game_20221108T231007.slp");
    if (result === null) {
      throw new Error("Game Failed to Load");
    }
    expect(result.startTime).toBe(game1.startTime);
    expect(result.Character).toBe(game1.Character);
    expect(result.OppCharacter).toBe(game1.OppCharacter);
    expect(result.Stage).toBe(game1.Stage);
    expect(result.Duration).toBe(game1.Duration);
    expect(result.DidWin).toBe(game1.DidWin);
    expect(result.Kills).toBe(game1.Kills);
    expect(result.KillsConceded).toBe(game1.KillsConceded);
    expect(result.TotalDmgDone).toBe(game1.TotalDmgDone);
    expect(result.TotalDmgTaken).toBe(game1.TotalDmgTaken);
    expect(result.Conversions).toBe(game1.Conversions);
    expect(result.TotalOpenings).toBe(game1.TotalOpenings);
    expect(result.NeutralWins).toBe(game1.NeutralWins);
    expect(result.NeutralLosses).toBe(game1.NeutralLosses);
    expect(result.CHWins).toBe(game1.CHWins);
    expect(result.CHLosses).toBe(game1.CHLosses);
    expect(result.GoodTrades).toBe(game1.GoodTrades);
    expect(result.BadTrades).toBe(game1.BadTrades);
    expect(result.IPM).toBe(game1.IPM);
    expect(result.FileName).toBe(game1.FileName);
  });
});
