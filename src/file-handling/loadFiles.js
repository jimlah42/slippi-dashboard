const { dialog } = require('electron');
const fs = require('fs');
const path = require('path');
const { default: SlippiGame } = require('@slippi/slippi-js');
var filesInDB = [];
const sqlite3 = require('sqlite3');

const database = new sqlite3.Database('./public/db.sqlite3', (err) => {
    if (err) console.error('Database opening error: ', err);
});

database.all('SELECT FileName FROM Games', (err, rows) => {
    if (err) {
        throw err;
    }
    console.log('Checking Files in DB');
    rows.forEach((row) => {
        filesInDB.push(row.FileName);
    });
});

function openFile(mainWindow) {
    dialog.showOpenDialog(mainWindow, {
      properties: ['openFile'],
      filters: [{ name: 'Slippi', extensions: ['slp'] }]
    }).then(result => {
      console.log(result.canceled)
      console.log(result.filePaths)
      const game = new SlippiGame(result.filePaths.toString());
  
      console.log(game.getStats().overall);
  
      return(result.filePaths)
    }).catch(err => {
      console.log(err)
    })
  }

async function openFolder(mainWindow) {
    let result = await dialog.showOpenDialog(mainWindow, {
      properties: ['openDirectory'],
      filters: [{ name: 'Slippi', extensions: ['slp'] }]
    });
  
    console.log(result.filePaths);
    fs.readdir(result.filePaths.toString(), (err, files) => {
      files.forEach(file => {
        if (!filesInDB.includes(file) && path.extname(file) === ".slp") {
            filesInDB.push(file);
            readFile(result.filePaths.toString(),file);
        }
        //console.log(file);
      });
    });
}

function readFile(rootDir, file) {
    const filePath = path.join(rootDir, file);
    console.log(filePath);
    const game = new SlippiGame(filePath);
    //const metadata = game.getMetadata();
    console.log(file);

    // const gameInfo = {
    //     StartTime: metadata.startAt,

    // }



    console.log(game.getSettings());

}


exports.openFolder = openFolder;
exports.openFile = openFile;