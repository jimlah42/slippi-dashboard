// import type { EmptyPayload, SuccessPayload } from "../utils/ipc";
import { _, makeEndpoint } from "../utils/ipc";

//Main triggers

export const ipc_showOpenDialog = makeEndpoint.main(
  "showOpenDialog",
  <Electron.OpenDialogOptions>_,
  <{ filePaths: string[]; canceled: boolean }>_,
);
