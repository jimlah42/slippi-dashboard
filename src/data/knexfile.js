/* eslint-disable @typescript-eslint/no-var-requires */
// Update with your config settings.
const path = require("path");
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const dbPath = path.resolve(__dirname, "test.sqlite3");
console.log(dbPath);
module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: dbPath,
    },
    useNullAsDefault: true,
    migrations: {
      directory: path.resolve("migrations"),
    },
    debug: true,
  },
};
