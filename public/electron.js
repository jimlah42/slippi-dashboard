const { checkNewFiles } = require('../src/file-handling/loadFiles');
const { app, BrowserWindow, ipcMain, Menu } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

require('../src/message-control/main');


const isMac = process.platform === 'darwin'

let mainWindow;
let loadingWindow;
let workerWindow;

function createWindow() {
    mainWindow = new BrowserWindow({ 
      width: 900,
      height: 680 ,
      webPreferences: {
        nodeIntegration: true,
      },
      show: false
    });
    mainWindow.loadURL(
        isDev
            ? 'http://localhost:3000'
            : `file://${path.join(__dirname, '../build/index.html')}`
    );

    workerWindow = new BrowserWindow({
      show: true,
      webPreferences: { nodeIntegration: true }
    });
    workerWindow.loadURL(`file://${path.join(__dirname, './worker.html')}`);
    
    const template = [
      // { role: 'appMenu' }
      ...(isMac ? [{
        label: app.name,
        submenu: [
          { role: 'about' },
          { type: 'separator' },
          { role: 'services' },
          { type: 'separator' },
          { role: 'hide' },
          { role: 'hideothers' },
          { role: 'unhide' },
          { type: 'separator' },
          { role: 'quit' }
        ]
      }] : []),
      // { role: 'fileMenu' }
      {
        label: 'File',
        submenu: [
          { 
            label: "Check for new Files" ,
            click() {
              checkNewFiles();
            }
          },
          isMac ? { role: 'close' } : { role: 'quit' }
        ]
      },
      // { role: 'editMenu' }
      {
        label: 'Edit',
        submenu: [
          { role: 'undo' },
          { role: 'redo' },
          { type: 'separator' },
          { role: 'cut' },
          { role: 'copy' },
          { role: 'paste' },
          ...(isMac ? [
            { role: 'pasteAndMatchStyle' },
            { role: 'delete' },
            { role: 'selectAll' },
            { type: 'separator' },
            {
              label: 'Speech',
              submenu: [
                { role: 'startSpeaking' },
                { role: 'stopSpeaking' }
              ]
            }
          ] : [
            { role: 'delete' },
            { type: 'separator' },
            { role: 'selectAll' }
          ])
        ]
      },
      // { role: 'viewMenu' }
      {
        label: 'View',
        submenu: [
          { role: 'reload' },
          { role: 'forceReload' },
          { role: 'toggleDevTools' },
          { type: 'separator' },
          { role: 'resetZoom' },
          { role: 'zoomIn' },
          { role: 'zoomOut' },
          { type: 'separator' },
          { role: 'togglefullscreen' }
        ]
      },
      // { role: 'windowMenu' }
      {
        label: 'Window',
        submenu: [
          { role: 'minimize' },
          { role: 'zoom' },
          ...(isMac ? [
            { type: 'separator' },
            { role: 'front' },
            { type: 'separator' },
            { role: 'window' }
          ] : [
            { role: 'close' }
          ])
        ]
      },
      {
        role: 'help',
        submenu: [
          {
            label: 'Learn More',
            click: async () => {
              const { shell } = require('electron')
              await shell.openExternal('https://electronjs.org')
            }
          }
        ]
      }
    ];
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    mainWindow.webContents.on('did-finish-load', () => {
      /// then close the loading screen window and show the main window
      if (loadingWindow) {
        loadingWindow.close();
      }
      mainWindow.show();
    });
    
    mainWindow.on('closed', () => {
        mainWindow = null;
        if (!isMac) {
          app.quit();
      }
    });
}

async function createLoadingWindow() {
  loadingWindow = new BrowserWindow({ 
    width: 200,
    height: 400 ,
    frame: false,
    tansparent: true,
    webPreferences: {
      nodeIntegration: true,
    }
  });
  loadingWindow.setResizable(false);
  loadingWindow.loadURL(`file://${path.join(__dirname, './loading.html')}`);
  loadingWindow.on('closed', () => (loadingWindow = null));
  loadingWindow.webContents.on('did-finish-load', () => {
    loadingWindow.show();
  });

};

function sendWindowMessage(targetWindow, message, payload) {
  if(typeof targetWindow === 'undefined') {
    console.log('Target window does not exist');
    return;
  }
  targetWindow.webContents.send(message, payload);
}

app.on('ready', () => {
    createLoadingWindow();
    createWindow();

});

app.on('window-all-closed', () => {
    if (!isMac) {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

ipcMain.on('check-new-files', function(event){
    sendWindowMessage(workerWindow, 'check-new-files', 'payload')
  })