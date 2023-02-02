import fs from "fs";
import path from "path";
import type { Database } from "sql.js";
import initSqlJs from "sql.js";
const filebuffer = fs.readFileSync(path.resolve("src/data/test.sqlite3"));

export default async () => {
  console.log("Initialising DB");
  const SQL = await initSqlJs();
  const db: Database = new SQL.Database(filebuffer);
  return db;
};
