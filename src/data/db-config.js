/* eslint-disable @typescript-eslint/no-var-requires */
const knex = require("knex");
const config = require("./knexfile");

const db = knex(config.development);

export default db;
