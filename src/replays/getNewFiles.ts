import { Filtered } from "data/entity/Filtered";
import * as fs from "fs-extra";
import path from "path";

import { dbSource } from "../data/datasouce";
import { Stats } from "../data/entity/Stats";
import type { FileWithPath } from "./types";

export async function getNewFiles(folder: string): Promise<FileWithPath[]> {
  const currentFiles = await getCurrentFiles();
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

  console.log(newFiles);
  return newFiles;
}

async function getCurrentFiles(): Promise<Set<string>> {
  const db = await dbSource;
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
