import { writeFileSync } from "fs";

import dbInit from "../db-setup";

export async function up() {
  const db = await dbInit();

  db.run("CREATE TABLE snapshots (dateTime LONGINT, snapshot BLOB)");

  const data = db.export();

  const buffer = Buffer.from(data);

  writeFileSync("test.sqlite", buffer);
}
