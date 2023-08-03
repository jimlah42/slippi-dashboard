import { dbSource } from "data/datasouce";
import type { Stats } from "data/entity/Stats";
import { expose } from "threads";
import type { ModuleMethods } from "threads/dist/types/master";
import type { SelectQueryBuilder } from "typeorm";

import type { DataAvgs, DataCounts, QueryParams } from "./types";
import { addAvgsSelect, buildQueryFromParams, createCountQuery, executeCountQuery } from "./utils";

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
    let query = buildQueryFromParams(db, params);

    const periodRegex = {
      year: "'%Y'",
      month: "'%Y-%m'",
      week: "'%Y-%m'",
      none: "'%Y-%m'",
    };

    query.select("STRFTIME(" + periodRegex[period] + ", stats.StartTime)", "Period");

    query.addSelect("COUNT(*)", "TotalGames");
    query = addAvgsSelect(query);
    query.groupBy("STRFTIME(" + periodRegex[period] + ", stats.StartTime)");

    const periodAvgs = await query.getRawMany();

    console.log(periodAvgs);

    return periodAvgs;
  },

  async getAvgs(params: QueryParams): Promise<DataAvgs> {
    const db = await dbSource;
    let query = buildQueryFromParams(db, params);
    query.select("COUNT(*)", "TotalGames");
    query = addAvgsSelect(query);

    const sums = await query.getRawOne();
    if (params.period) {
      sums["Period"] = params.period;
    }
    console.log(sums);

    return sums;
  },
  async getCounts(params: QueryParams): Promise<DataCounts> {
    const db = await dbSource;
    const characterQuery = createCountQuery(db, params, "stats.Character");
    const oppCharacterQuery = createCountQuery(db, params, "stats.oppCharacter");
    const oppCodeQuery = createCountQuery(db, params, "stats.OppCode");
    const stageQuery = createCountQuery(db, params, "stats.Stage");

    const CharacterCount = await executeCountQuery(db, characterQuery);
    const OppCharacterCount = await executeCountQuery(db, oppCharacterQuery);
    const OppCodeCount = await executeCountQuery(db, oppCodeQuery);
    const StageCount = await executeCountQuery(db, stageQuery);

    const Count: DataCounts = {
      CharacterCount: CharacterCount,
      OppCharacterCount: OppCharacterCount,
      OppCodeCount: OppCodeCount,
      StageCount: StageCount,
    };

    if (params.period) {
      Count["Period"] = params.period;
    }
    console.log(Count);

    return Count;
  },
};

expose(methods);
