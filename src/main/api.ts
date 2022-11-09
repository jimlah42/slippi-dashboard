import { ipcRenderer } from "electron";

import {
  ipc_pingPong,
  ipc_simpleMsg,
} from "./ipc";


export default {
  async pingPong() {
    await ipc_pingPong.renderer!.trigger({});
  },
  async simpleMsg(message: string) {
    const { result } = await ipc_simpleMsg.renderer!.trigger({message});
    return result;
  }
};

