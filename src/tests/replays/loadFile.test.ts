import fs from "fs";
import _ from "lodash";

import * as loadFileC from "../../replays/loadFileC";

describe("parseFile", () => {
  const raw_data = fs.readFileSync("./src/tests/test-replays/base_game_data.json", "utf8");
  const base_game_data = JSON.parse(raw_data);
  it("should parse a valid file properly", async () => {
    const res = await loadFileC.parseFile("./src/tests/test-replays/base_game.slp");
    expect(res).not.toBe(null);
    expect(_.isEqual(res, base_game_data)).toBe(true);
  });
});

describe("getConversions", () => {
  it("should count any punishes with > 1 move landed", () => {
    const player = { punishes: [{ num_moves: 1 }, { num_moves: 2 }] };

    expect(loadFileC.getConversions(player)).toBe(1);
  });
  it("should return 0 if no punishes exisit", () => {
    const player = { punishes: [] };

    expect(loadFileC.getConversions(player)).toBe(0);
  });
});
