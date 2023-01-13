import type { API } from "./main/preload";

declare global {
  interface Window {
    electron: API;
  }
  const REPLAYS_PATH = "src/tests/slp";
}
