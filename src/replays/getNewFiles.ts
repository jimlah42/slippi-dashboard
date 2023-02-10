import { Filtered } from "data/entity/Filtered";
import * as fs from "fs-extra";

import { dbSource } from "../data/datasouce";
import { Stats } from "../data/entity/Stats";

export async function getNewFiles(folder: string): Promise<string[]> {
  const currentFiles = await getCurrentFiles();
  const newFiles = [];

  const result = await fs.readdir(folder);
  console.log(result);

  for (let i = 0; i < result.length; i++) {
    if (!currentFiles.has(result[i])) {
      newFiles.push(result[i]);
    }
  }

  console.log(newFiles);
  return newFiles;
}

async function getCurrentFiles(): Promise<Set<string>> {
  const db = await dbSource;
  // const db = dbSourceConfig;
  const currentFiles = new Set<string>();
  const test = await db.manager.exists(Stats);
  const filtered = await db.manager.createQueryBuilder(Filtered, "filtered").select("filtered.FileName").getMany();
  const result = await db.manager.createQueryBuilder(Stats, "stats").select("stats.FileName").getMany();
  console.log("exists " + test + " res: " + result);
  console.log(result);

  for (let i = 0; i < result.length; i++) {
    currentFiles.add(result[i].FileName);
  }
  for (let i = 0; i < filtered.length; i++) {
    currentFiles.add(filtered[i].FileName);
  }
  return currentFiles;
}
