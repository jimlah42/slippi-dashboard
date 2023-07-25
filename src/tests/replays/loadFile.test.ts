import fs from "fs";
import _ from "lodash";

import * as loadFileC from "../../replays/loadFileC";
import type { GameData } from "../../replays/types";
import { GameMode } from "../../replays/types";

const raw_data = fs.readFileSync("./src/tests/test-replays/base_game_data.json", "utf8");
const base_game_data: GameData = JSON.parse(raw_data);
const noPunishPlayer = Object.assign({}, base_game_data.players![1]);
noPunishPlayer.punishes = null;

describe("getConversions", () => {
  it("should count any punishes with > 1 move landed", () => {
    const player = base_game_data.players![1];

    expect(loadFileC.getConversions(player)).toBe(6);
  });
  it("should return 0 if no punishes exisit", () => {
    expect(loadFileC.getConversions(noPunishPlayer)).toBe(0);
  });
});

describe("getMostCommonKillMove", () => {
  it("should return the correct most common kill move for each player", () => {
    const player = base_game_data.players![1];
    const opponent = base_game_data.players![0];

    expect(loadFileC.getMostCommonKillMove(player)).toBe("Fsmash");
    expect(loadFileC.getMostCommonKillMove(opponent)).toBe("DownB");
  });

  it("should retun empty string if no killing punishes exist", () => {
    expect(loadFileC.getMostCommonKillMove(noPunishPlayer)).toBe("");
  });
});

describe("getGameMode", () => {
  it("should classify direct games properly", () => {
    const res = loadFileC.getGameMode("mode.direct-2023-07-11T10:59:31.34-0");
    expect(res.valueOf === GameMode.DIRECT.valueOf).toBe(true);
  });
  it("should classify ranked games properly", () => {
    const res = loadFileC.getGameMode("mode.ranked-2023-07-11T10:59:31.34-0");
    expect(res.valueOf === GameMode.RANKED.valueOf).toBe(true);
  });
  it("should classify unranked games properly", () => {
    const res = loadFileC.getGameMode("mode.unranked-2023-07-11T10:59:31.34-0");
    expect(res.valueOf === GameMode.UNRANKED.valueOf).toBe(true);
  });
  it("should classify unknown game modes as unranked", () => {
    const res = loadFileC.getGameMode("mode.unknown-2023-07-11T10:59:31.34-0");
    expect(res.valueOf === GameMode.UNKNOWN.valueOf).toBe(true);
  });
});
