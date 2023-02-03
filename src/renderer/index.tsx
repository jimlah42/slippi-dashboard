import { createRoot } from "react-dom/client";

import App from "./App";

const container = document.getElementById("root")!;
const root = createRoot(container);
root.render(<App />);
console.log("Hello");
// window.electron.replays
//   .loadFiles(["DateReadData.slp"])
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((error) => {
//     console.error("Error ", error);
//   });

window.electron.replays.onReplayLoadProgressUpdate((progress) => {
  console.log(progress);
});

async function runTest() {
  const files = await window.electron.replays.getNewFiles("src/tests/slpLarge/");
  const result = await window.electron.replays.loadFiles(files);

  console.log(result);
}

runTest().catch((err) => {
  console.error("Error ", err);
});
