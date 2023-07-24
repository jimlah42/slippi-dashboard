import util from "node:util";

import _ from "lodash";
import path from "path";

import type { GameStats } from "./types";
import { getCharNameByIndex, getStageNameByIndex } from "./utils";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const execFile = util.promisify(require("node:child_process").execFile);

const MIN_GAME_LENGTH_SECONDS = 30;

export async function parseFile(filename: string): Promise<any | null> {
  let data;
  try {
    console.log("./src/replays/slippc -i ", filename, " -a ", " - ");
    const { stdout, stderr } = await execFile("./src/replays/slippc", ["-i", filename, "-a", "-"]);
    if (stderr != "") {
      console.log("Exec File error");
      console.log(stderr);
      return null;
    }
    data = stdout;
    const jsonData = JSON.parse(data);
    return jsonData;
  } catch (e) {
    console.log("Parse error");
    console.log(e);
    return null;
  }
}

export function validGame(PLAYER_CODE: string[], players: any[], jsonData: any): boolean {
  if (!PLAYER_CODE.includes(players![0].tag_code) && !PLAYER_CODE.includes(players![1].tag_code)) {
    console.log("Not players game");
    return false;
  }
  const duration = Math.round(jsonData.game_length! / 60);

  if (duration < MIN_GAME_LENGTH_SECONDS) {
    console.log("Game filter for game length");
    return false;
  }

  return true;
}

export function getConversions(player: any): number {
  let conversionCount = 0;
  for (let i = 0; i < player.punishes.length; i++) {
    if (player.punishes[i].num_moves > 1) {
      conversionCount += 1;
    }
  }
  return conversionCount;
}

export async function loadFileC(fullPath: string, playerCodes: string[]): Promise<GameStats | null> {
  const filename = path.basename(fullPath);

  const jsonData = await parseFile(fullPath);

  if (jsonData == null) {
    console.log("Json data null");
    return null;
  }

  const PLAYER_CODE = playerCodes;

  const players = jsonData.players;

  if (!validGame(PLAYER_CODE, players, jsonData)) {
    console.log("Not valid game");
    return null;
  }

  const duration = Math.round(jsonData.game_length! / 60);

  const playerId = PLAYER_CODE.includes(players![0].tag_code) ? 0 : 1;
  const oppId = PLAYER_CODE.includes(players![1].tag_code) ? 0 : 1;

  let didWin = 0;

  if (jsonData.winner_port == jsonData.players[playerId].port) {
    didWin = 1;
  } else {
    didWin = 0;
  }

  const dateTime = jsonData.game_time;

  const player = jsonData.players[playerId];
  const opponent = jsonData.players[oppId];

  const gameStats: GameStats = {
    //General
    StartTime: dateTime,
    Character: getCharNameByIndex(player.char_id),
    OppCharacter: getCharNameByIndex(opponent.char_id),
    Code: player.tag_code,
    OppCode: opponent.tag_code,
    Stage: getStageNameByIndex(jsonData.stage_id),
    Duration: duration,
    DidWin: didWin,
    Kills: 4 - opponent.end_stocks + opponent.self_destructs,
    KillsConceded: 4 - player.end_stocks + player.self_destructs,
    TotalDmgDone: _.round(player.damage_dealt, 1),
    TotalDmgTaken: _.round(opponent.damage_dealt, 1),
    Conversions: getConversions(player),
    TotalOpenings: player.total_openings,
    NeutralWins: player.neutral_wins,
    NeutralLosses: opponent.neutral_wins,
    CHWins: player.counters,
    CHLosses: opponent.counters,
    LCancelSuccessRate: _.round(player.l_cancels_hit / (player.l_cancels_hit + player.l_cancels_missed), 4),
    IPM: _.round(player.actions_per_min, 1),
    FileName: filename,
    //Actions
    WavedashCount: player.wavedashes,
    WavelandCount: player.wavelands,
    AirDodgeCount: player.airdodges,
    DashDanceCount: player.dashdances,
    SpotDodgeCount: player.spotdodges,
    LedgegrabCount: player.ledge_grabs,
    RollCount: player.rolls,

    AvgDeathPercent: player.mean_death_percent,
    AvgKillPercent: player.mean_kill_percent,

    MostCommonKillMove: "", //TODO Kill move fun
    MostCommonMoveKillby: "", //TODO Kill move func

    SDs: player.self_destructs,
  };

  return gameStats;
}
