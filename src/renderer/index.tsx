import { createRoot } from "react-dom/client";

import App from "./App";

const container = document.getElementById("root")!;
const root = createRoot(container);
root.render(<App />);
console.log("Hello");
void window.electron.common.pingPong();
window.electron.replays
  .loadFiles(["DateReadData.slp"])
  .then((res) => {
    console.log(res);
  })
  .catch((error) => {
    console.error("Error ", error);
  });
console.log(window.electron.common.simpleMsg("hi"));
