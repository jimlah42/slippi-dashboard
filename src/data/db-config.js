const knex = require("knex");
const config = require("../knex/knexfile.js");

const db = knex(config.development);

module.exports = db;
