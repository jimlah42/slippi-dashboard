exports.up = function (knex) {
  return knex.schema.createTable("stats", (tbl) => {
    tbl.dateTime("StartTime");
    tbl.primary(["StartTime"]);
    tbl.string("Character", 50);
    tbl.string("OppCharacter", 128);
    tbl.string("OppCode", 128);
    tbl.string("Stage", 128);
    tbl.integer("Duration");
    tbl.integer("DidWin");
    tbl.integer("Kills");
    tbl.integer("KillsConceded");
    tbl.integer("TotalDmgDone");
    tbl.integer("TotalDmgTaken");
    tbl.integer("Conversions");
    tbl.integer("TotalOpenings");
    tbl.integer("NeutralWins");
    tbl.integer("NeutralLosses");
    tbl.integer("CHWins");
    tbl.integer("CHLosses");
    tbl.integer("GoodTrades");
    tbl.integer("BadTrades");
    tbl.integer("IPM");
    tbl.string("FileName", 128);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("stats");
};
