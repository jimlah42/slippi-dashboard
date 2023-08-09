import path from "path";
import { exit } from "process";
import { DataSource } from "typeorm";

import { Filtered } from "../../data/entity/Filtered";
import { Stats } from "../../data/entity/Stats";

export const dbSourceConfig = new DataSource({
  type: "better-sqlite3",
  database: path.resolve("src/tests/data/test.sqlite3"),
  entities: [Stats, Filtered],
  synchronize: true,
  logging: false,
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

export const testDbSource = connectToDB();
