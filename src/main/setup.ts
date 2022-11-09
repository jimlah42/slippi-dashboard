import { ipc_pingPong, ipc_simpleMsg } from "./ipc";

export default function setupMainIpc() {
  ipc_pingPong.main!.handle(async () => {
    console.log("Pong");
    return { success: true };
  });
  ipc_simpleMsg.main!.handle(async ({ message }) => {
    return { response: "Hello recieved" + message };
  });
}
