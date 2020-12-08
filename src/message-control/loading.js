const { ipcRenderer } = require('electron');
var loadedFiles = 0;



ipcRenderer.on('loading-new-files', (event, arg) => {
    let payload = arg;
    console.log('Got loading msg');
    console.log('Files:', payload.noOfFiles);
});


ipcRenderer.on('loaded-new-file', (event, arg) => {
    //let payload = arg;
    console.log('Got loaded msg');
    loadedFiles++;
    console.log('Files:', loadedFiles);
    document.getElementById("filesLoaded").textContent = loadedFiles.toString();
  });
