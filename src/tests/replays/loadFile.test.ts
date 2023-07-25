import fs from "fs";
import _ from "lodash";

import * as loadFileC from "../../replays/loadFileC";
import type { GameData } from "../../replays/types";

const raw_data = fs.readFileSync("./src/tests/test-replays/base_game_data.json", "utf8");
const base_game_data: GameData = JSON.parse(raw_data);
const noPunishPlayer = Object.assign({}, base_game_data.players![1]);
noPunishPlayer.punishes = null;

describe("parseFile", () => {
  it("should parse a valid file properly", async () => {
    const test = __dirname;
    const proj_dir = test.slice(0, test.search("src"));
    console.log(proj_dir + "src/tests/test-replays/base_game.slp");
    const res: GameData | null = await loadFileC.parseFile(proj_dir + "src/tests/test-replays/base_game.slp");
    expect(res).not.toBe(null);
    base_game_data!.original_file = res!.original_file;
    expect(_.isEqual(res, base_game_data)).toBe(true);
  });
});

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
