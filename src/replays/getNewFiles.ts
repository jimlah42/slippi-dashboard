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
  const currentFiles = new Set<string>();
  const test = await db.manager.exists(Stats);
  const result = await db.manager.createQueryBuilder(Stats, "stats").select("stats.FileName").getMany();
  console.log("exists " + test + " res: " + result);
  console.log(result);
  for (let i = 0; i < result.length; i++) {
    currentFiles.add(result[i].FileName);
  }
  return currentFiles;
}
