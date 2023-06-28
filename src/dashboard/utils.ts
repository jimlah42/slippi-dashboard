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

  // console.log(query.getSql());

  return query;
}
