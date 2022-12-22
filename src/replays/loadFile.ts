/* Code based off https://github.com/project-slippi/slippi-launcher/blob/main/src/replays/loadFile.ts
  from project-slippi/slippi-launcher
*/

import type { MetadataType } from "@slippi/slippi-js";
import { SlippiGame } from "@slippi/slippi-js";
import * as fs from "fs-extra";
import _ from "lodash";
import moment from "moment";
import path from "path";

import type { GameStats } from "./types";
import { getCharNameByIndex } from "./utils/characters";
import { getStageNameByIndex } from "./utils/stages";

const MIN_GAME_LENGTH_SECONDS = 30;
//TODO Change to implement electron-settings
const PLAYER_CODE = "MARV#420";

export async function loadFile(fullPath: string): Promise<GameStats | null> {
  const filename = path.basename(fullPath);
  const game = new SlippiGame(fullPath);

  const metadata: MetadataType | null = game.getMetadata();

  if (metadata === null) {
    throw new Error("no metadata");
    // return null;
  }

  const duration = Math.round(metadata.lastFrame! / 60);

  if (duration < MIN_GAME_LENGTH_SECONDS) {
    return null;
  }

  const settings = game.getSettings()!;
  if (settings.players.length !== 2) {
    console.log("not 1v1");
    return null;
  }
  const stats = game.getStats()!;
  const gameEnd = game.getGameEnd()!;
  const players = metadata.players;
  const playerId = players![0].names!.code === PLAYER_CODE ? 0 : 1;
  const oppId = players![0].names!.code === PLAYER_CODE ? 1 : 0;

  const playerStats = stats.overall[playerId];
  const oppStats = stats.overall[oppId];

  const placements = gameEnd.placements!;
  const didWin = placements[0].playerIndex == playerId ? 1 : 0;

  const dateTime = await fileToDateTime(metadata ? metadata.startAt : null, filename, fullPath);

  if (!dateTime) {
    console.log("Failed to read time");
    return null;
  }

  const gameStats: GameStats = {
    startTime: dateTime.toISOString(),
    Character: getCharNameByIndex(settings.players[playerId].characterId!),
    OppCharacter: getCharNameByIndex(settings.players[oppId].characterId!),
    OppCode: settings.players[oppId].connectCode,
    Stage: getStageNameByIndex(settings.stageId!),
    Duration: duration,
    DidWin: didWin,
    Kills: playerStats.killCount,
    KillsConceded: oppStats.killCount,
    TotalDmgDone: _.round(playerStats.totalDamage, 1),
    TotalDmgTaken: _.round(oppStats.totalDamage, 1),
    Conversions: playerStats.successfulConversions.count,
    TotalOpenings: playerStats.successfulConversions.total,
    NeutralWins: playerStats.neutralWinRatio.count,
    NeutralLosses: oppStats.neutralWinRatio.count,
    CHWins: playerStats.counterHitRatio.count,
    CHLosses: oppStats.counterHitRatio.count,
    GoodTrades: playerStats.beneficialTradeRatio.count,
    BadTrades: oppStats.beneficialTradeRatio.count,
    IPM: _.round(playerStats.inputsPerMinute.ratio!, 1),
    FileName: filename,
  };
  return gameStats;
}

function convertToDateTime(dateTimeString: moment.MomentInput): moment.Moment | null {
  const asMoment = moment(dateTimeString);
  if (asMoment.isValid()) {
    return asMoment.local();
  }
  return null;
}

async function fileToDateTime(
  dateTimeString: string | undefined | null,
  fileName: string,
  fullPath: string,
): Promise<moment.Moment | null> {
  let startAt = convertToDateTime(dateTimeString);
  if (startAt) {
    return startAt;
  }

  startAt = filenameToDateTime(fileName);
  if (startAt) {
    return startAt;
  }

  const { birthtime } = await fs.stat(fullPath);
  startAt = convertToDateTime(birthtime);

  return startAt;
}

function filenameToDateTime(filename: string): moment.Moment | null {
  const timeReg = /\d{8}T\d{6}/g;
  const filenameTime = filename.match(timeReg);

  if (filenameTime === null) {
    return null;
  }

  const time = moment(filenameTime[0]).local();
  return time;
}
