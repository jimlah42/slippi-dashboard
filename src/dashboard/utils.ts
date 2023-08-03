import { Stats } from "data/entity/Stats";
import type { DataSource, SelectQueryBuilder } from "typeorm";

import type { QueryParams } from "./types";

export function buildQueryFromParams(db: DataSource, params: QueryParams): SelectQueryBuilder<Stats> {
  let query: SelectQueryBuilder<Stats>;
  if (params.NoOfGames != null) {
    const limitQuery = db
      .getRepository(Stats)
      .createQueryBuilder("stats")
      .select("*")
      .orderBy("stats.StartTime", "DESC")
      .limit(params.NoOfGames);
    query = db.createQueryBuilder().from("(" + limitQuery.getQuery() + ")", "stats");
  } else {
    query = db.getRepository(Stats).createQueryBuilder("stats");
  }

  if (params.startDate != null) {
    console.log(params.startDate);
    query.where("stats.startTime >= :StartDate", { StartDate: params.startDate });
  }
  if (params.endDate != null) {
    query.andWhere("stats.startTime <= :EndDate", { EndDate: params.endDate });
  }
  if (params.Character != null) {
    query.andWhere("stats.Character = :Character", { Character: params.Character });
  }
  if (params.OppCharacter != null) {
    query.andWhere("stats.OppCharacter = :OppCharacter", { OppCharacter: params.OppCharacter });
  }
  if (params.gameMode != null) {
    query.andWhere("stats.gameMode = :gameMode", { gameMode: params.gameMode });
  }
  // console.log(query.getSql());

  return query;
}

export function addAvgsSelect(query: SelectQueryBuilder<Stats>): SelectQueryBuilder<Stats> {
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
  query.addSelect("AVG(stats.LCancelSuccessRate)", "AvgLCancelSuccessRate");
  query.addSelect("AVG(stats.IPM)", "AvgIPM");
  query.addSelect("AVG(stats.AvgDeathPercent)", "AvgDeathPercent");
  query.addSelect("AVG(stats.AvgKillPercent)", "AvgKillPercent");

  return query;
}

export function createCountQuery(db: DataSource, params: QueryParams, type: string): SelectQueryBuilder<Stats> {
  const query = buildQueryFromParams(db, params);
  //Character counts
  query.select(type, "Name");
  query.addSelect("COUNT(*)", "Count");
  query.addSelect("SUM(stats.DidWin)", "Wins");
  query.groupBy(type);
  query.orderBy("Count", "DESC");

  return query;
}

export async function executeCountQuery(db: DataSource, query: SelectQueryBuilder<Stats>) {
  return db
    .createQueryBuilder()
    .select("*")
    .addSelect("result.Count - result.Wins", "Losses")
    .from("(" + query.getQuery() + ")", "result")
    .setParameters(query.getParameters())
    .getRawMany();
}
