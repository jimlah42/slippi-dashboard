const fs = require('fs');
const path = require('path');
var filesInDB = [];
const sqlite3 = require('sqlite3');
const { getCharNameByIndex } = require('../util/characters');
const { getStageNameByIndex } = require('../util/stages');

const MIN_GAME_LENGTH_SECONDS = 30;
//TODO Change to implement electron-settings
const PLAYER_CODE = 'MARV#420';
const SLIPPI_PATH = 'C:\\Users\\Johnathan\\Documents\\Slippi Test Folder\\';

const database = new sqlite3.Database('./public/db.sqlite3', (err) => {
    if (err) console.error('Database opening error: ', err);
});

function checkNewFiles()  {
    database.all('SELECT FileName FROM Games', (err, rows) => {
        if (err) {
            throw err;
        }
        console.log('Checking Files in DB');
        rows.forEach((row) => {
            if (!filesInDB.includes(row)) {
                filesInDB.push(row.FileName);
            }
        });
        addNewFiles();
    });
    return;
}


function addNewFiles() {
    
    fs.readdir(SLIPPI_PATH, (err, files) => {
        files.forEach(file => {
          if (!filesInDB.includes(file) && path.extname(file) === ".slp") {
              const gameInfo = readFile(SLIPPI_PATH,file);
              if (gameInfo) {
                  //Add to database
                  console.log(gameInfo);
  
                  database.run(`INSERT INTO "main"."Games" ("StartTime", "Character", "OppCharacter", "Stage", "Duration", "DidWin", "FileName") VALUES(?,?,?,?,?,?,?)`,
                   [gameInfo.StartTime, gameInfo.Character, gameInfo.OppCharacter, gameInfo.Stage, gameInfo.Duration, gameInfo.DidWin, gameInfo.FileName], function(err) {
                      if (err) {
                        return console.log(err.message);
                      }
                      // get the last insert id
                      console.log(`A row has been inserted with rowid ${this.lastID}`);
                    });
  
                  filesInDB.push(file);
                  
              }
          }
          //console.log(file);
        });
      });
}

function readFile(rootDir, file) {
    const { default: SlippiGame } = require('@slippi/slippi-js');

    const filePath = path.join(rootDir, file);
    console.log(filePath);
    const game = new SlippiGame(filePath);

    const metadata = game.getMetadata();
    console.log(metadata);

    if(!metadata) {
        return
    }
    const duration = Math.round(metadata.lastFrame/60);

    if (duration < MIN_GAME_LENGTH_SECONDS) {
        return;
    }

    const settings = game.getSettings();
    const stats = game.getStats();

    const players = metadata.players;
    const playerId = (players[0].names.code === PLAYER_CODE) ? 0 : 1;
    const oppId = (players[0].names.code === PLAYER_CODE) ? 1 : 0;
   
    var Win;

    if (stats.overall[playerId].killCount === 4) { Win = 1 } else { Win = 0};

    const gameInfo = {
        StartTime: metadata.startAt,
        Character: getCharNameByIndex(settings.players[playerId].characterId),
        OppCharacter: getCharNameByIndex(settings.players[oppId].characterId),
        Stage: getStageNameByIndex(settings.stageId),
        Duration: duration,
        DidWin: Win,
        FileName: file
    }



   return gameInfo;

}



// function buildInstertQuery(gameInfo) {
//     const sql =  'INSERT INTO "main"."Games" ("StartTime", "Character", "OppCharacter", "Stage", "Duration", "DidWin", "FileName") VALUES ' +
//                     `('${gameInfo.StartTime}', '${gameInfo.Character}', '${gameInfo.OppCharacter}', ${gameInfo.Stage}, ${gameInfo.Duration}, ${gameInfo.DidWin}, '${gameInfo.FileName}');`;             
//     return sql;
// }


exports.checkNewFiles = checkNewFiles;