import { buildQueryFromParams } from "dashboard/utils";
import type { DataSource, SelectQueryBuilder } from "typeorm";

import { Stats } from "../../data/entity/Stats";
import { testDbSource } from "../data/testDataSource";

let db: DataSource;

beforeAll(async () => {
  db = await testDbSource;
  return;
});

describe("bulildQueryFromParams", () => {
  it("should return base querybuilder for no params", () => {
    const query = buildQueryFromParams(db, {});
    const baseQuery: SelectQueryBuilder<Stats> = db.getRepository(Stats).createQueryBuilder("stats");

    expect(query.getSql()).toBe(baseQuery.getSql());
  });

  it("should correctly add start date to query", () => {
    const startDate = "2023/06/15";
    const query = buildQueryFromParams(db, { startDate: startDate });
    const baseQuery: SelectQueryBuilder<Stats> = db
      .getRepository(Stats)
      .createQueryBuilder("stats")
      .where("stats.startTime >= :StartDate", { StartDate: startDate });

    expect(query.getSql()).toBe(baseQuery.getSql());
  });
  it("should correctly add end date to query", () => {
    const endDate = "2023/06/15";
    const query = buildQueryFromParams(db, { endDate: endDate });
    const baseQuery: SelectQueryBuilder<Stats> = db
      .getRepository(Stats)
      .createQueryBuilder("stats")
      .where("stats.startTime <= :EndDate", { EndDate: endDate });

    expect(query.getSql()).toBe(baseQuery.getSql());
  });
  it("should correctly add character to query", () => {
    const Character = "Falco";
    const query = buildQueryFromParams(db, { Character: Character });
    const baseQuery: SelectQueryBuilder<Stats> = db
      .getRepository(Stats)
      .createQueryBuilder("stats")
      .where("stats.Character = :Character", { Character: Character });

    expect(query.getSql()).toBe(baseQuery.getSql());
  });

  it("should correctly add opp character to query", () => {
    const OppCharacter = "Falco";
    const query = buildQueryFromParams(db, { OppCharacter: OppCharacter });
    const baseQuery: SelectQueryBuilder<Stats> = db
      .getRepository(Stats)
      .createQueryBuilder("stats")
      .where("stats.OppCharacter = :OppCharacter", { OppCharacter: OppCharacter });

    expect(query.getSql()).toBe(baseQuery.getSql());
  });
});
