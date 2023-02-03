import fs from "fs";
import path from "path";
import { exit } from "process";
import { DataSource } from "typeorm";

import { Stats } from "./entity/Stats";
let db;
try {
  db = fs.readFileSync(path.resolve("src/data/test.sqlite3"));
} catch {
  db = Buffer.from([]);
}

const dbSourceConfig = new DataSource({
  type: "sqljs",
  database: db,
  autoSave: true,
  location: path.resolve("src/data/test.sqlite3"),
  entities: [Stats],
  synchronize: true,
  logging: false,
});

const connectToDB = async () => {
  try {
    await dbSourceConfig.initialize();
    return dbSourceConfig;
  } catch (err) {
    console.error("Error initialising DB", err);
    exit(1);
  }
};

export const dbSource = connectToDB();
