import fs from "fs";
import path from "path";
import { exit } from "process";
import { DataSource } from "typeorm";

import { Filtered } from "./entity/Filtered";
import { Stats } from "./entity/Stats";

let db;
try {
  db = fs.readFileSync(path.resolve("src/data/test.sqlite3"));
} catch {
  db = Buffer.from([]);
}

export const dbSourceConfig = new DataSource({
  type: "sqljs",
  database: db,
  autoSave: true,
  location: path.resolve("src/data/test.sqlite3"),
  entities: [Stats, Filtered],
  synchronize: true,
  logging: false,
  useLocalForage: true,
});

// dbSourceConfig
//   .initialize()
//   .then(() => {
//     console.log("Db inialized");
//   })
//   .catch((err) => {
//     console.log("Failed to initialise db", err);
//     exit(1);
//   });

const connectToDB = async () => {
  try {
    await dbSourceConfig.initialize();
    console.log("Initialised db");
    return dbSourceConfig;
  } catch (err) {
    console.error("Error initialising DB", err);
    exit(1);
  }
};

export const dbSource = connectToDB();
