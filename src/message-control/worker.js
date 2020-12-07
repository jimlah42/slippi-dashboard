const { ipcRenderer } = require('electron');
const { checkNewFiles } = require('../file-handling/loadFiles');

ipcRenderer.on('check-new-files', function(event){
    console.log('Got msg');
    checkNewFiles();
  })