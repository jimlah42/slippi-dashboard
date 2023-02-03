import setupReplayIpc from "../replays/setup";
import setupMainIpc from "./setup";

export function installModules() {
  setupReplayIpc();
  setupMainIpc();
}
