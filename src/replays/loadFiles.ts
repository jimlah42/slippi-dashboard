import { exists } from "../common/exists";
import { dbSource } from "../data/datasouce";
import { Stats } from "../data/entity/Stats";
import { loadFile } from "./loadFile";
import type { FilesLoadResult, GameStats } from "./types";

export async function loadFiles(
  files: string[],
  folderPath: string,
  callback: (current: number, total: number) => void = () => null,
): Promise<FilesLoadResult> {
  if (files.length < 0) {
    return {
      files: [],
      filesOmmitted: 0,
    };
  }

  const db = await dbSource;

  // const gamesLoaded: GameStats[] = [];
  let vaildLoads = 0;
  const total = files.length;

  const fullSlippiPaths = files.map((fileName) => folderPath.concat(fileName));

  const process = async (path: string) => {
    return new Promise<GameStats | null>((resolve) => {
      setImmediate(async () => {
        const res = await loadFile(path);
        if (res == null) {
          resolve(null);
        }

        try {
          await db.createQueryBuilder().insert().into(Stats).values(res!).execute();
          console.log("Loaded file to db");
          vaildLoads += 1;
          callback(vaildLoads, total);
          resolve(res);
        } catch (err) {
          resolve(null);
        }
      });
    });
  };

  console.log(fullSlippiPaths);

  const filePromise = Promise.all(
    fullSlippiPaths.map((fullpath) => {
      return process(fullpath);
    }),
  );

  const gamesLoaded = await filePromise;
  return {
    files: gamesLoaded.filter(exists),
    filesOmmitted: total - vaildLoads,
  };
}
