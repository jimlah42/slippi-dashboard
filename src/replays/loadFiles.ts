import { dbSource } from "../data/datasouce";
import { Filtered } from "../data/entity/Filtered";
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
      filesLoaded: 0,
      filesOmmitted: 0,
    };
  }

  const db = await dbSource;
  // const db = dbSourceConfig;

  // const gamesLoaded: GameStats[] = [];
  let vaildLoads = 0;
  const total = files.length;

  const fullSlippiPaths = files.map((fileName) => folderPath.concat(fileName));

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

  const process = async (fileNameString: string) => {
    return new Promise<GameStats | null>((resolve) => {
      setImmediate(async () => {
        const res = await loadFile(folderPath.concat(fileNameString));
        if (res == null) {
          addToBlackList(fileNameString);
          console.log("failed load");
          resolve(null);
        } else {
          if (filesSeen.has(res.StartTime)) {
            addToBlackList(fileNameString);
            console.warn("Dupe File");
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
                addToBlackList(fileNameString);
              });
          }
          gamesList.push(res!);
          console.log("Loaded file to db");
          vaildLoads += 1;
          callback(vaildLoads, total);
          resolve(res);
        }
      });
    });
  };

  console.log(fullSlippiPaths);
  const filePromise = Promise.all(
    files.map((fileName) => {
      return process(fileName);
    }),
  );

  await filePromise;

  callback(total, total);
  return {
    filesLoaded: vaildLoads,
    filesOmmitted: total - vaildLoads,
  };
}
