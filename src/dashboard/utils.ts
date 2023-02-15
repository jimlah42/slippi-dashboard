import type { Stats } from "data/entity/Stats";
import type { SelectQueryBuilder } from "typeorm";

import type { QueryParams } from "./types";

export function buildQueryFromParams(query: SelectQueryBuilder<Stats>, params: QueryParams) {
  if (params.startDate != null) {
    query.where("stats.startTime < :StartDate", { StartDate: params.startDate });
  }
  if (params.endDate != null) {
    query.andWhere("stats.startTime > :EndDate", { EndDate: params.endDate });
  }
  if (params.Character != null) {
    query.andWhere("stats.Character = :Character", { Character: params.Character });
  }
  if (params.OppCharacter != null) {
    query.andWhere("stats.OppCharacter = :OppCharacter", { OppCharacter: params.OppCharacter });
  }
}
