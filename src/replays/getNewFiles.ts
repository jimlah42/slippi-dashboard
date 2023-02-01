//TODO When DB implemented atm will just return all files in the folder

import * as fs from "fs-extra";

import db from "../data/db-config";

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

//TODO Gets all filenames from DB
async function getCurrentFiles(): Promise<Set<string>> {
  const currentFiles = new Set<string>();
  const filesInDB = await db("stats").select("FileName");
  console.log(filesInDB);

  for (let i = 0; i < filesInDB.length; i++) {
    currentFiles.add(filesInDB[i].FileName);
  }

  return currentFiles;
}
