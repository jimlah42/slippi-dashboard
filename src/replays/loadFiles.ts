import { loadFile } from "./loadFile";
import type { FilesLoadResult, GameStats } from "./types";

export async function loadFiles(files: string[], path: string): Promise<FilesLoadResult> {
  if (files.length < 0) {
    return {
      files: [],
      filesOmmitted: 0,
    };
  }

  const gamesLoaded = [];
  let failedLoads = 0;

  for (let i = 0; i < files.length; i++) {
    const file: GameStats | null = await loadFile(path + files[i]);
    if (!file) {
      failedLoads++;
      console.log(failedLoads);
    } else {
      gamesLoaded.push(file);
    }
  }

  return {
    files: gamesLoaded,
    filesOmmitted: failedLoads,
  };
}
