import { createConnection } from "data/datasouce";
import { Filtered } from "data/entity/Filtered";
import * as fs from "fs-extra";
import path from "path";

import { Stats } from "../data/entity/Stats";
import type { FileWithPath } from "./types";

export async function getNewFiles(dbPath: string, folder: string): Promise<FileWithPath[]> {
  const currentFiles = await getCurrentFiles(dbPath);
  const newFiles = [];
  const subDirectorys: string[] = [];

  subDirectorys.push(folder);
  while (subDirectorys.length > 0) {
    const currPath = subDirectorys.pop();
    const result = await fs.readdir(currPath!, { withFileTypes: true });
    for (let i = 0; i < result.length; i++) {
      if (result[i].isDirectory()) {
        console.log("Directory: " + result[i].name);
        subDirectorys.push(path.join(currPath!, result[i].name));
      } else if (result[i].isFile() && path.extname(result[i].name) && !currentFiles.has(result[i].name)) {
        newFiles.push({ path: currPath!, fileName: result[i].name });
      }
    }
  }

  return newFiles;
}

async function getCurrentFiles(dbPath: string): Promise<Set<string>> {
  const db = await createConnection(dbPath);
  const currentFiles = new Set<string>();
  const filtered = await db.manager.createQueryBuilder(Filtered, "filtered").select("filtered.FileName").getMany();
  const result = await db.manager.createQueryBuilder(Stats, "stats").select("stats.FileName").getMany();
  console.log(result);

  for (let i = 0; i < result.length; i++) {
    currentFiles.add(result[i].FileName);
  }
  for (let i = 0; i < filtered.length; i++) {
    currentFiles.add(filtered[i].FileName);
  }
  return currentFiles;
}
