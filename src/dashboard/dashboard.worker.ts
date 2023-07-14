import { dbSource } from "data/datasouce";
import type { Stats } from "data/entity/Stats";
import { expose } from "threads";
import type { ModuleMethods } from "threads/dist/types/master";
import type { SelectQueryBuilder } from "typeorm";

import type { DataAvgs, DataCounts, QueryParams } from "./types";
import { buildQueryFromParams } from "./utils";

interface Methods {
  dispose: () => Promise<void>;
  refreshDB: () => Promise<void>;
  getWinLoss(params: QueryParams): Promise<{ Wins: number; Losses: number }>;
  getPeriodAvgs(params: QueryParams): Promise<DataAvgs[]>;
  getAvgs(params: QueryParams): Promise<DataAvgs>;
  getCounts(params: QueryParams): Promise<DataCounts>;
}

export type WorkerSpec = ModuleMethods & Methods;

const methods: WorkerSpec = {
  async dispose(): Promise<void> {
    console.log("dashboard: dispose worker");
  },
  async refreshDB(): Promise<void> {
    console.log("Refreshing DB...");
    const db = await dbSource;
    await db.destroy();
    await db.initialize();
    console.log("Refreshed");
  },
  async getWinLoss(params: QueryParams): Promise<{ Wins: number; Losses: number }> {
    const db = await dbSource;
    const winQuery: SelectQueryBuilder<Stats> = buildQueryFromParams(db, params);
    const lossQuery: SelectQueryBuilder<Stats> = buildQueryFromParams(db, params);

    winQuery.select("COUNT(*)", "Wins");
    winQuery.andWhere("stats.didWin = 1");

    // console.log(winQuery.getSql());

    const Wins = await winQuery.getRawOne();

    lossQuery.addSelect("COUNT(*)", "Losses");
    lossQuery.andWhere("stats.didWin = 0");

    const Losses = await lossQuery.getRawOne();

    return {
      Wins: Wins.Wins,
      Losses: Losses.Losses,
    };
  },

  async getPeriodAvgs(params: QueryParams): Promise<DataAvgs[]> {
    let period;
    if (!params.period) {
      period = "none";
    } else {
      period = params.period;
    }
    const db = await dbSource;
    const query = buildQueryFromParams(db, params);

    const periodRegex = {
      year: "'%Y'",
      month: "'%Y-%m'",
      week: "'%Y-%m'",
      none: "'%Y-%m'",
    };
    // switch (period) {
    //   case "year":
    //     query.select("STRFTIME('%Y', stats.StartTime)", "Period");
    //     break;
    //   case "month":
    //     query.select("STRFTIME('%Y-%m', stats.StartTime)", "Period");
    //     break;
    //   case "week":
    //     query.select("STRFTIME('%Y-%m', stats.StartTime)", "Period");
    //     break;
    //   default:
    //     query.select("STRFTIME('%', stats.StartTime)", "Period");
    //     break;
    // }

    query.select("STRFTIME(" + periodRegex[period] + ", stats.StartTime)", "Period");

    query.addSelect("COUNT(*)", "TotalGames");
    query.addSelect("AVG(stats.Duration)", "AvgDuration");
    query.addSelect("AVG(stats.Kills)", "AvgKills");
    query.addSelect("AVG(stats.KillsConceded)", "AvgKillsConceded");
    query.addSelect("AVG(stats.TotalDmgDone)", "AvgTotalDmgDone");
    query.addSelect("AVG(stats.TotalDmgTaken)", "AvgTotalDmgTaken");
    query.addSelect("AVG(stats.Conversions)", "AvgConversions");
    query.addSelect("AVG(stats.TotalOpenings)", "AvgTotalOpenings");
    query.addSelect("AVG(stats.TotalOpenings / NULLIF(stats.Kills, 0))", "AvgOpeningsPerKill");
    query.addSelect("AVG(stats.NeutralWins)", "AvgNeutralWins");
    query.addSelect("AVG(stats.NeutralLosses)", "AvgNeutralLosses");
    query.addSelect("AVG(stats.CHWins)", "AvgCHWins");
    query.addSelect("AVG(stats.CHLosses)", "AvgCHLosses");
    query.addSelect("AVG(stats.GoodTrades)", "AvgGoodTrades");
    query.addSelect("AVG(stats.BadTrades)", "AvgBadTrades");
    query.addSelect("AVG(stats.LCancelSuccessRate)", "AvgLCancelSuccessRate");
    query.addSelect("AVG(stats.IPM)", "AvgIPM");
    query.groupBy("STRFTIME(" + periodRegex[period] + ", stats.StartTime)");

    const periodAvgs = await query.getRawMany();

    console.log(periodAvgs);

    return periodAvgs;
  },

  async getAvgs(params: QueryParams): Promise<DataAvgs> {
    const db = await dbSource;
    const query = buildQueryFromParams(db, params);
    query.select("COUNT(*)", "TotalGames");
    query.addSelect("AVG(stats.Duration)", "AvgDuration");
    query.addSelect("AVG(stats.Kills)", "AvgKills");
    query.addSelect("AVG(stats.KillsConceded)", "AvgKillsConceded");
    query.addSelect("AVG(stats.TotalDmgDone)", "AvgTotalDmgDone");
    query.addSelect("AVG(stats.TotalDmgTaken)", "AvgTotalDmgTaken");
    query.addSelect("AVG(stats.Conversions)", "AvgConversions");
    query.addSelect("AVG(stats.TotalOpenings)", "AvgTotalOpenings");
    query.addSelect("AVG(stats.TotalOpenings / NULLIF(stats.Kills, 0))", "AvgOpeningsPerKill");
    query.addSelect("AVG(stats.NeutralWins)", "AvgNeutralWins");
    query.addSelect("AVG(stats.NeutralLosses)", "AvgNeutralLosses");
    query.addSelect("AVG(stats.CHWins)", "AvgCHWins");
    query.addSelect("AVG(stats.CHLosses)", "AvgCHLosses");
    query.addSelect("AVG(stats.GoodTrades)", "AvgGoodTrades");
    query.addSelect("AVG(stats.BadTrades)", "AvgBadTrades");
    query.addSelect("AVG(stats.LCancelSuccessRate)", "AvgLCancelSuccessRate");
    query.addSelect("AVG(stats.IPM)", "AvgIPM");

    const sums = await query.getRawOne();

    console.log(sums);

    return sums;
  },
  async getCounts(params: QueryParams): Promise<DataCounts> {
    const db = await dbSource;
    const characterQuery = buildQueryFromParams(db, params);
    const oppCharacterQuery = buildQueryFromParams(db, params);
    const oppCodeQuery = buildQueryFromParams(db, params);
    const stageQuery = buildQueryFromParams(db, params);

    //Character counts
    characterQuery.select("stats.Character", "Name");
    characterQuery.addSelect("COUNT(*)", "Count");
    characterQuery.addSelect("SUM(stats.DidWin)", "Wins");
    characterQuery.groupBy("stats.Character");
    characterQuery.orderBy("Count", "DESC");

    //oppCharacter counts
    oppCharacterQuery.select("stats.oppCharacter", "Name");
    oppCharacterQuery.addSelect("COUNT(*)", "Count");
    oppCharacterQuery.addSelect("SUM(stats.DidWin)", "Wins");
    oppCharacterQuery.groupBy("stats.oppCharacter");
    oppCharacterQuery.orderBy("Count", "DESC");

    //oppCodeQuery counts
    oppCodeQuery.select("stats.OppCode", "Name");
    oppCodeQuery.addSelect("COUNT(*)", "Count");
    oppCodeQuery.addSelect("SUM(stats.DidWin)", "Wins");
    oppCodeQuery.groupBy("stats.OppCode");
    oppCodeQuery.orderBy("Count", "DESC");

    //stageQuery counts
    stageQuery.select("stats.Stage", "Name");
    stageQuery.addSelect("COUNT(*)", "Count");
    stageQuery.addSelect("SUM(stats.DidWin)", "Wins");
    stageQuery.groupBy("stats.Stage");
    stageQuery.orderBy("Count", "DESC");

    console.log("After");
    console.log(stageQuery.getSql());

    const CharacterCount = await db
      .createQueryBuilder()
      .select("*")
      .addSelect("stats.Count - stats.Wins", "Losses")
      .from("(" + characterQuery.getQuery() + ")", "stats")
      .setParameters(characterQuery.getParameters())
      .getRawMany();

    const OppCharacterCount = await db
      .createQueryBuilder()
      .select("*")
      .addSelect("result.Count - result.Wins", "Losses")
      .from("(" + oppCharacterQuery.getQuery() + ")", "result")
      .setParameters(oppCharacterQuery.getParameters())
      .getRawMany();

    const OppCodeCount = await db
      .createQueryBuilder()
      .select("*")
      .addSelect("result.Count - result.Wins", "Losses")
      .from("(" + oppCodeQuery.getQuery() + ")", "result")
      .setParameters(oppCodeQuery.getParameters())
      .getRawMany();

    const StageCount = await db
      .createQueryBuilder()
      .select("*")
      .addSelect("result.Count - result.Wins", "Losses")
      .from("(" + stageQuery.getQuery() + ")", "result")
      .setParameters(stageQuery.getParameters())
      .getRawMany();

    // const CharacterCount = await characterQuery.getRawMany();
    // const OppCharacterCount = await oppCharacterQuery.getRawMany();
    // const OppCodeCount = await oppCodeQuery.getRawMany();
    // const StageCount = await stageQuery.getRawMany();

    const Count: DataCounts = {
      CharacterCount: CharacterCount,
      OppCharacterCount: OppCharacterCount,
      OppCodeCount: OppCodeCount,
      StageCount: StageCount,
    };

    console.log(Count);

    return Count;
  },
};

expose(methods);
