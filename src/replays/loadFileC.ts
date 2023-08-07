import util from "node:util";

import _ from "lodash";
import path from "path";

import type { GameData, GameStats, PlayerType } from "./types";
import { GameMode } from "./types";
import { getCharNameByIndex, getStageNameByIndex } from "./utils";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const execFile = util.promisify(require("node:child_process").execFile);

const MIN_GAME_LENGTH_SECONDS = 30;

export async function parseFile(filename: string): Promise<GameData | null> {
  let data;
  try {
    const test = __dirname;
    const proj_dir = test.slice(0, test.search("src"));

    console.log(proj_dir + "src/replays/slippc", "-i", filename, "-a", "-");
    const { stdout, stderr } = await execFile(proj_dir + "src/replays/slippc", ["-i", filename, "-a", "-"]);
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

export function validGame(PLAYER_CODE: string[], players: PlayerType[], jsonData: GameData): boolean {
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

export function getConversions(player: PlayerType): number {
  let conversionCount = 0;
  if (player.punishes == null || player.punishes == undefined) {
    return 0;
  }
  for (let i = 0; i < player.punishes!.length; i++) {
    if (player.punishes![i].num_moves > 1 || player.punishes![i].kill_dir != "NEUT") {
      conversionCount += 1;
    }
  }
  return conversionCount;
}

export function getMostCommonKillMove(player: PlayerType): string {
  const killMoves: Record<string, number> = {};
  if (player.punishes == null || player.punishes == undefined) {
    console.log("No punishes");
    return "";
  }

  const punishes_that_ended_stock = [];
  for (let i = 0; i < player.punishes.length; i++) {
    if (player.punishes![i]!.kill_dir != "NEUT") {
      punishes_that_ended_stock.push(player.punishes![i]!);
    }
  }

  for (let i = 0; i < punishes_that_ended_stock.length; i++) {
    const moveName: string = punishes_that_ended_stock[i].last_move_name;
    if (moveName in killMoves) {
      killMoves[moveName] = killMoves[moveName] + 1;
    } else {
      killMoves[moveName] = 1;
    }
  }

  let MostCommonKillMove = "";
  let curMax = 0;
  for (const key in killMoves) {
    if (killMoves[key] > curMax) {
      MostCommonKillMove = key;
      curMax = killMoves[key];
    }
  }

  return MostCommonKillMove;
}

export function getGameMode(matchId: string): GameMode {
  if (matchId.includes("direct")) {
    return GameMode.DIRECT;
  } else if (matchId.includes("ranked")) {
    return GameMode.RANKED;
  } else if (matchId.includes("unranked")) {
    return GameMode.UNRANKED;
  } else {
    return GameMode.UNKNOWN;
  }
}

export function getLCancelRate(l_cancels_hit: number, l_cancels_missed: number): number | null {
  if (l_cancels_hit + l_cancels_missed != 0) {
    return _.round(l_cancels_hit / (l_cancels_hit + l_cancels_missed), 4);
  } else {
    return null;
  }
}

export async function loadFileC(fullPath: string, playerCodes: string[]): Promise<GameStats | null> {
  const filename = path.basename(fullPath);

  const jsonData: GameData | null = await parseFile(fullPath);

  if (jsonData == null) {
    console.log("Json data null");
    return null;
  }

  const PLAYER_CODE = playerCodes;

  const players = jsonData.players;

  if (players == null) {
    console.log("No players");
    return null;
  }

  if (!validGame(PLAYER_CODE, players, jsonData)) {
    console.log("Not valid game");
    return null;
  }

  const duration = Math.round(jsonData.game_length! / 60);

  const playerId = PLAYER_CODE.includes(players![0].tag_code) ? 0 : 1;
  const oppId = PLAYER_CODE.includes(players![1].tag_code) ? 0 : 1;

  let didWin = 0;

  if (jsonData.winner_port == jsonData.players![playerId].port) {
    didWin = 1;
  } else {
    didWin = 0;
  }

  const dateTime = jsonData.game_time;

  const player = jsonData.players![playerId];
  const opponent = jsonData.players![oppId];

  const gameStats: GameStats = {
    //General
    StartTime: dateTime,
    GameMode: getGameMode(jsonData.match_id),
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
    Conversions: getConversions(player!),
    TotalOpenings: player.total_openings,
    NeutralWins: player.neutral_wins,
    NeutralLosses: opponent.neutral_wins,
    CHWins: player.counters,
    CHLosses: opponent.counters,
    LCancelSuccessRate: getLCancelRate(player.l_cancels_hit, player.l_cancels_missed),
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

    MostCommonKillMove: getMostCommonKillMove(player),
    MostCommonMoveKillby: getMostCommonKillMove(opponent),
    MoveAccuracy: player.move_accuracy,

    SDs: player.self_destructs,

    //Defense
    HitsBlocked: player.hits_blocked,
    ShieldTime: player.shield_time,
    PowerShields: player.powershields,
    TechsHit: player.techs,
    TechsMissed: player.missed_techs,
    SheildDmgTaken: player.shield_damage,
    SheildDmgDone: opponent.shield_damage,

    //LedgeDahes
    GalintLedgeDashCount: player.galint_ledgedashes,
    AverageGalint: player.mean_galint,
    MaxGalint: player.max_galint,
  };

  return gameStats;
}
