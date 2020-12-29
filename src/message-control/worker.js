const { ipcRenderer } = require('electron');
const { checkNewFiles } = require('../file-handling/loadFiles');
const { getWinLoss } = require('../db-calls/getWL');

ipcRenderer.on('check-new-files', async function(event){
    console.log('Got msg');
    ipcRenderer.send('loading-new-files');
    const noOfFiles = await checkNewFiles();
    console.log('loading-new-files ' + noOfFiles);
    
    console.log('finished');
  })


ipcRenderer.on('get-w/l', async function(event, args){
  const response = await getWinLoss(args);
  console.log(response.wins + '/' + response.losses);
  event.sender.send('get-w/l-reply', {wins: response.wins, losses: response.losses});
});