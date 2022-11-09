import { app, ipcMain } from "electron";
import os from "os";
import osName from "os-name";
import electronLog from "electron-log";
import path from "path"



import {
  ipc_pingPong,
  ipc_simpleMsg,
} from "./ipc";

const log = electronLog.scope("main/isteners");


export default function setupMainIpc() {
  ipc_pingPong.main!.handle(async () => {
    console.log("Pong");
    return { success: true }
  });
  ipc_simpleMsg.main!.handle(async ({message}) => {
    return { response: "Hello recieved" + message};
  });
}

