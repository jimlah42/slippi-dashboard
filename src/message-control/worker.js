const { ipcRenderer } = require('electron');
const { checkNewFiles } = require('../file-handling/loadFiles');

ipcRenderer.on('check-new-files', async function(event){
    console.log('Got msg');
    ipcRenderer.send('loading-new-files');
    const noOfFiles = await checkNewFiles();
    console.log('loading-new-files ' + noOfFiles);
    
    console.log('finished');
  })