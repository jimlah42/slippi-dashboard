import { dialog } from "electron";

import { ipc_showOpenDialog } from "./ipc";

export default function setupMainIpc() {
  ipc_showOpenDialog.main!.handle(async (options) => {
    const { canceled, filePaths } = await dialog.showOpenDialog(options);
    return { canceled, filePaths };
  });
}
