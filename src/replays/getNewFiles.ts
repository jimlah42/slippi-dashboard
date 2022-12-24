//TODO When DB implemented atm will just return all files in the folder

import * as fs from "fs-extra";

export async function getNewFiles(folder: string): Promise<string[]> {
  const currentFiles = new Set<string>();
  getCurrentFiles(currentFiles);
  const newFiles = [];

  const result = await fs.readdir(folder);

  for (let i = 0; i < result.length; i++) {
    if (!currentFiles.has(result[i])) {
      newFiles.push(result[i]);
    }
  }

  return newFiles;
}

//TODO Gets all filenames from DB
function getCurrentFiles(currentFiles: Set<string>) {
  currentFiles.add("DateReadData.slp");
}
