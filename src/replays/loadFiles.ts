import path from "path";

import { dbSource } from "../data/datasouce";
import { Filtered } from "../data/entity/Filtered";
import { Stats } from "../data/entity/Stats";
import { loadFile } from "./loadFile";
import type { FilesLoadResult, FileWithPath, GameStats } from "./types";

export async function loadFiles(
  files: FileWithPath[],
  playerCodes: string[],
  callback: (current: number, total: number) => void = () => null,
): Promise<FilesLoadResult> {
  if (files.length < 0) {
    return {
      filesLoaded: 0,
      filesOmmitted: 0,
    };
  }

  const db = await dbSource;
  // const db = dbSourceConfig;

  // const gamesLoaded: GameStats[] = [];
  let vaildLoads = 0;
  const total = files.length;

  // const fullSlippiPaths = files.map((fileName) => folderPath.concat(fileName));

  callback(0, total);

  const gamesList: GameStats[] = [];

  const filesSeen = new Set<string>();

  function addToBlackList(fileName: string) {
    db.createQueryBuilder()
      .insert()
      .into(Filtered)
      .values({ FileName: fileName })
      .execute()
      .catch(() => console.warn("Failed Load to filtered"));
  }

  let totalLoads = 0;

  const process = async (file: FileWithPath) => {
    return new Promise<GameStats | null>((resolve) => {
      setImmediate(async () => {
        const res = await loadFile(path.join(file.path, file.fileName), playerCodes);
        if (res == null) {
          addToBlackList(file.fileName);
          console.log("failed load");
          totalLoads += 1;
          callback(totalLoads, total);
          resolve(null);
        } else {
          if (filesSeen.has(res.StartTime)) {
            addToBlackList(file.fileName);
            console.warn("Dupe File");
            totalLoads += 1;
            callback(totalLoads, total);
            resolve(null);
          } else {
            filesSeen.add(res.StartTime);
            db.createQueryBuilder()
              .insert()
              .into(Stats)
              .values(res)
              .execute()
              .catch((err) => {
                console.warn(err);
                addToBlackList(file.fileName);
              });
          }
          gamesList.push(res!);
          console.log("Loaded file to db");
          vaildLoads += 1;
          totalLoads += 1;
          callback(totalLoads, total);
          resolve(res);
        }
      });
    });
  };

  // console.log(fullSlippiPaths);
  const filePromise = Promise.all(
    files.map((file) => {
      return process(file);
    }),
  );

  await filePromise;

  callback(total, total);
  return {
    filesLoaded: vaildLoads,
    filesOmmitted: total - vaildLoads,
  };
}
