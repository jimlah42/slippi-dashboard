import { dbSource } from "data/datasouce";
import { expose } from "threads";
import type { ModuleMethods } from "threads/dist/types/master";

import { Stats } from "../data/entity/Stats";
import type { DataAvgs, DataCounts, QueryParams } from "./types";
import { buildQueryFromParams } from "./utils";

interface Methods {
  dispose: () => Promise<void>;
  refreshDB: () => Promise<void>;
  getWinLoss(params: QueryParams): Promise<{ Wins: number; Losses: number }>;
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
    const winQuery = db.getRepository(Stats).createQueryBuilder("stats");
    const lossQuery = db.getRepository(Stats).createQueryBuilder("stats");
    buildQueryFromParams(winQuery, params);
    buildQueryFromParams(lossQuery, params);

    const Wins = await winQuery.andWhere("stats.didWin = 1").getCount();
    const Losses = await lossQuery.andWhere("stats.didWin = 0").getCount();

    return {
      Wins: Wins,
      Losses: Losses,
    };
  },

  async getAvgs(params: QueryParams): Promise<DataAvgs> {
    const db = await dbSource;
    const query = db.getRepository(Stats).createQueryBuilder("stats");
    query.select("COUNT(*)", "TotalGames");
    query.addSelect("AVG(stats.Duration)", "AvgDuration");
    query.addSelect("AVG(stats.Kills)", "AvgKills");
    query.addSelect("AVG(stats.KillsConceded)", "AvgKillsConceded");
    query.addSelect("AVG(stats.TotalDmgDone)", "AvgTotalDmgDone");
    query.addSelect("AVG(stats.TotalDmgTaken)", "AvgTotalDmgTaken");
    query.addSelect("AVG(stats.Conversions)", "AvgConversions");
    query.addSelect("AVG(stats.TotalOpenings)", "AvgTotalOpenings");
    query.addSelect("AVG(stats.NeutralWins)", "AvgNeutralWins");
    query.addSelect("AVG(stats.NeutralLosses)", "AvgNeutralLosses");
    query.addSelect("AVG(stats.CHWins)", "AvgCHWins");
    query.addSelect("AVG(stats.CHLosses)", "AvgCHLosses");
    query.addSelect("AVG(stats.GoodTrades)", "AvgGoodTrades");
    query.addSelect("AVG(stats.BadTrades)", "AvgBadTrades");
    query.addSelect("AVG(stats.LCancelSuccessRate)", "AvgLCancelSuccessRate");
    query.addSelect("AVG(stats.IPM)", "AvgIPM");
    buildQueryFromParams(query, params);

    const sums = await query.getRawOne();

    console.log(sums);

    return sums;
  },
  async getCounts(params: QueryParams): Promise<DataCounts> {
    const db = await dbSource;
    const characterQuery = db.getRepository(Stats).createQueryBuilder("stats");
    const oppCharacterQuery = db.getRepository(Stats).createQueryBuilder("stats");
    const oppCodeQuery = db.getRepository(Stats).createQueryBuilder("stats");
    const stageQuery = db.getRepository(Stats).createQueryBuilder("stats");

    //Character counts
    characterQuery.select("stats.Character", "Name");
    characterQuery.addSelect("COUNT(*)", "Count");
    characterQuery.groupBy("stats.Character");
    characterQuery.orderBy("Count", "DESC");
    buildQueryFromParams(characterQuery, params);

    //oppCharacter counts
    oppCharacterQuery.select("stats.oppCharacter", "Name");
    oppCharacterQuery.addSelect("COUNT(*)", "Count");
    oppCharacterQuery.groupBy("stats.oppCharacter");
    oppCharacterQuery.orderBy("Count", "DESC");
    buildQueryFromParams(oppCharacterQuery, params);

    //oppCodeQuery counts
    oppCodeQuery.select("stats.OppCode", "Name");
    oppCodeQuery.addSelect("COUNT(*)", "Count");
    oppCodeQuery.groupBy("stats.OppCode");
    oppCodeQuery.orderBy("Count", "DESC");
    buildQueryFromParams(oppCodeQuery, params);

    //stageQuery counts
    stageQuery.select("stats.Stage", "Name");
    stageQuery.addSelect("COUNT(*)", "Count");
    stageQuery.groupBy("stats.Stage");
    stageQuery.orderBy("Count", "DESC");
    buildQueryFromParams(stageQuery, params);

    const CharacterCount = await characterQuery.getRawMany();
    const OppCharacterCount = await oppCharacterQuery.getRawMany();
    const OppCodeCount = await oppCodeQuery.getRawMany();
    const StageCount = await stageQuery.getRawMany();

    const Count = {
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
