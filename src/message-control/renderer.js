const electron = window.require('electron');
const { ipcRenderer } = electron;

ipcRenderer.on('message-from-worker', (event, arg) => {
    let payload = arg.payload;
    console.log('My param:', payload.myParam);
    console.log('Another param:', payload.anotherParam);
  });

ipcRenderer.on('win/loss', (event, arg) => {
  console.log(arg.wins + '/' + arg.losses);
});

export default function send(msgType, args) {
  ipcRenderer.send(msgType, args);
}