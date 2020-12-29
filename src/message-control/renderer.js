const electron = window.require('electron');
const {ipcRenderer } = electron;

ipcRenderer.on('message-from-worker', (event, arg) => {
    let payload = arg.payload;
    console.log('My param:', payload.myParam);
    console.log('Another param:', payload.anotherParam);
  });


export function getWinLoss(args) {
  return new Promise((resolve) => {
    ipcRenderer.once('get-w/l-reply', (event, arg) => {
      console.log(arg.wins + '/' + arg.losses);
      resolve(arg);
    });
    send('get-w/l', args);
  });
}

export function send(msgType, args) {
  ipcRenderer.send(msgType, args);
}