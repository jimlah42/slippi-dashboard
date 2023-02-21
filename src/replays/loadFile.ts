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
import { getCharNameByIndex, getStageNameByIndex } from "./utils";

const MIN_GAME_LENGTH_SECONDS = 30;

export async function loadFile(fullPath: string, playerCode: string): Promise<GameStats | null> {
  const filename = path.basename(fullPath);
  const game = new SlippiGame(fullPath);

  // const test = settingsManager.get().PlayerCode;
  const PLAYER_CODE = playerCode;
  // console.log("Player Code: " + test);
  const metadata: MetadataType | null = game.getMetadata();

  if (metadata === null) {
    console.warn("no metadata");
    return null;
  }
  const players = metadata.players;
  if (PLAYER_CODE != players![0].names!.code && PLAYER_CODE != players![1].names!.code) {
    console.log("Not players game");
    return null;
  }
  const duration = Math.round(metadata.lastFrame! / 60);

  if (duration < MIN_GAME_LENGTH_SECONDS) {
    console.log("Game filter for game length");
    return null;
  }

  const settings = game.getSettings()!;
  if (settings.players.length !== 2) {
    console.log("not 1v1");
    return null;
  }
  const stats = game.getStats()!;
  const gameEnd = game.getGameEnd()!;
  const playerId = players![0].names!.code === PLAYER_CODE ? 0 : 1;
  const oppId = players![0].names!.code === PLAYER_CODE ? 1 : 0;

  const playerStats = stats.overall[playerId];
  const oppStats = stats.overall[oppId];

  const placements = gameEnd.placements!;

  let didWin = 0;
  //Only files from Sept 2022 forward have placement data
  if (placements[playerId].position != null && placements[oppId].position != null) {
    didWin = placements[playerId].position == 0 ? 1 : 0;
  } else {
    //Wont handle timeouts properly on old files atm
    const stocks = stats.stocks;
    for (let i = 0; i < stocks.length; i++) {
      if (stocks[i].endFrame == null) {
        console.log(stocks[i].playerIndex + " " + playerId);
        didWin = stocks[i].playerIndex === playerId ? 1 : 0;
      }
    }
  }

  const dateTime = await fileToDateTime(metadata ? metadata.startAt : null, filename, fullPath);

  if (!dateTime) {
    console.log("Failed to read time");
    return null;
  }

  const playerActions = stats.actionCounts[playerId];

  const gameStats: GameStats = {
    StartTime: dateTime.toISOString(),
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
    LCancelSuccessRate: _.round(
      playerActions.lCancelCount.success / (playerActions.lCancelCount.success + playerActions.lCancelCount.fail),
      4,
    ),
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
