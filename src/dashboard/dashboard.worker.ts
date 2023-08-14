import { createConnection } from "data/datasouce";
import type { Stats } from "data/entity/Stats";
import { expose } from "threads";
import type { ModuleMethods } from "threads/dist/types/master";
import type { SelectQueryBuilder } from "typeorm";

import type { DataAvgs, DataCounts, QueryParams } from "./types";
import { addAvgsSelect, buildQueryFromParams, createCountQuery, executeCountQuery } from "./utils";

interface Methods {
  dispose: () => Promise<void>;
  refreshDB: (resPath: string) => Promise<void>;
  getWinLoss(resPath: string, params: QueryParams): Promise<{ Wins: number; Losses: number }>;
  getPeriodAvgs(resPath: string, params: QueryParams): Promise<DataAvgs[]>;
  getAvgs(resPath: string, params: QueryParams): Promise<DataAvgs>;
  getCounts(resPath: string, params: QueryParams): Promise<DataCounts>;
}

export type WorkerSpec = ModuleMethods & Methods;

const methods: WorkerSpec = {
  async dispose(): Promise<void> {
    console.log("dashboard: dispose worker");
  },
  async refreshDB(resPath: string): Promise<void> {
    console.log("Refreshing DB...");
    const db = await createConnection(resPath);
    await db.destroy();
    await db.initialize();
    console.log("Refreshed");
  },
  async getWinLoss(resPath: string, params: QueryParams): Promise<{ Wins: number; Losses: number }> {
    const db = await createConnection(resPath);
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

  async getPeriodAvgs(resPath: string, params: QueryParams): Promise<DataAvgs[]> {
    const db = await createConnection(resPath);
    let period;
    if (!params.period) {
      period = "none";
    } else {
      period = params.period;
    }
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

  async getAvgs(resPath: string, params: QueryParams): Promise<DataAvgs> {
    const db = await createConnection(resPath);
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
  async getCounts(resPath: string, params: QueryParams): Promise<DataCounts> {
    const db = await createConnection(resPath);
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
