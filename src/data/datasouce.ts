import { exit } from "process";
import type { DataSourceOptions } from "typeorm";
import { DataSource } from "typeorm";

/* eslint-disable new-cap */
/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import { Filtered } from "./entity/Filtered";
import { Stats } from "./entity/Stats";

// dbSourceConfig
//   .initialize()
//   .then(() => {
//     console.log("Db inialized");
//   })
//   .catch((err) => {
//     console.log("Failed to initialise db", err);
//     exit(1);
//   });
let db: DataSource;

export async function createConnection(resPath: string): Promise<DataSource> {
  if (!db) {
    try {
      const dbOptions: DataSourceOptions = {
        type: "better-sqlite3",
        database: resPath,
        entities: [Stats, Filtered],
        synchronize: true,
        logging: false,
      };
      db = new DataSource(dbOptions);
      await db.initialize();
      console.log(resPath);
      console.log("Initialised db");
      return db;
    } catch (err) {
      console.error("Error initialising DB", err);
      exit(1);
    }
  }
  if (db.isInitialized) {
    console.log("Returning initialized db");
    return db;
  }

  console.log("waiting for db");
  return db.initialize();
}
