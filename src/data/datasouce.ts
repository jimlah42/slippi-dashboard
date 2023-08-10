import path from "path";
import { exit } from "process";
import { DataSource } from "typeorm";

import { Filtered } from "./entity/Filtered";
import { Stats } from "./entity/Stats";

console.log("Resource path");
console.log(process.resourcesPath);
let db;
if (process.resourcesPath) {
  db = path.join(process.resourcesPath, "src", "extraResources", "test.sqlite3");
} else {
  db = path.join(path.dirname(__dirname), "extraResources", "test.sqlite3");
}
console.log(db);
export const dbSourceConfig = new DataSource({
  type: "better-sqlite3",
  database: db,
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

export const dbSource = connectToDB();
