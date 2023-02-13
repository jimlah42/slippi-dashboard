import { dbSource } from "data/datasouce";
import { expose } from "threads";
import type { ModuleMethods } from "threads/dist/types/master";

import { Stats } from "../data/entity/Stats";
import type { QueryParams } from "./types";
import { buildQueryFromParams } from "./utils";

interface Methods {
  dispose: () => Promise<void>;
  refreshDB: () => Promise<void>;
  getWinLoss(params: QueryParams): Promise<{ Wins: number; Losses: number }>;
  getOpenings(params: QueryParams): Promise<{ Openings: number }>;
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

  async getOpenings(params: QueryParams): Promise<{ Openings: number }> {
    const db = await dbSource;
    const query = db.getRepository(Stats).createQueryBuilder("stats");
    query.select("SUM(stats.TotalOpenings)", "sum");
    buildQueryFromParams(query, params);

    const Openings = await query.getRawOne();

    return { Openings: Openings.sum };
  },
};

expose(methods);
