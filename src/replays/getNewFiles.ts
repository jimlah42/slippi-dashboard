//TODO When DB implemented atm will just return all files in the folder

import * as fs from "fs-extra";

import dbInit from "../data/db-setup";

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
  const db = await dbInit();
  const stmt = db.prepare("SELECT FileName FROM stats");
  while (stmt.step()) {
    const row = stmt.getAsObject();
    const value = row.FileName as string;
    currentFiles.add(value);
  }
  stmt.free();

  return currentFiles;
}
