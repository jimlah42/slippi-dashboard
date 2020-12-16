const fs = require('fs');
const path = require('path');
var filesInDB = [];
const { getCharNameByIndex } = require('../util/characters');
const { getStageNameByIndex } = require('../util/stages');
const { ipcRenderer } = require('electron');

var knex = require("knex") ({
    client: "sqlite3",
    connection: {
        filename: "./public/db.sqlite3"
    }
});

const MIN_GAME_LENGTH_SECONDS = 30;
//TODO Change to implement electron-settings
const PLAYER_CODE = 'MARV#420';
const SLIPPI_PATH = 'C:\\Users\\Johnathan\\Documents\\Slippi Test Folder\\';

async function checkNewFiles()  {
    var noOfFiles = 0;
    await getCurrentFiles();
    addNewFiles();
    
    return noOfFiles;
}

function getCurrentFiles() {
    return new Promise(function(resolve) {
        let result = knex.select('FileName').from('Games');
        result.then(function(rows) {
            console.log(rows);
            console.log('Checking Files in DB');
            rows.forEach((row) => {
                if (!filesInDB.includes(row)) {
                    filesInDB.push(row.FileName);
                }
            });
            resolve();
        });        
    });
}

function insertFile(gameInfo) {
    return new Promise(function(resolve) {
        knex('Games').insert(gameInfo).then(function(err) {
            if (err) {
                return console.log(err.message);
            }
            resolve();
        });
    });
}


function addNewFiles() {
    fs.readdir(SLIPPI_PATH, (err, files) => {
        var games = [];
        files.forEach(async file => {
          if (!filesInDB.includes(file) && path.extname(file) === ".slp") {
              const gameInfo = readFile(SLIPPI_PATH,file);
              if (gameInfo) {
                  //Add to database
                  //console.log(gameInfo);
                  games.push(gameInfo);
                  ipcRenderer.send('loaded-new-file');
                  await insertFile(gameInfo);
                  
                  filesInDB.push(file);
              }
          }
          //console.log(file);
        });
        //insertFiles(games);
        ipcRenderer.send('loading-finished');
      });
    
}

// async function insertFiles(games) {
//     for (const game of games) {
//         console.log('loaded-new-file');
//         await insertFile(game);
//         console.log("after insert");
//     }
//     ipcRenderer.send('loading-finished');
// }

function readFile(rootDir, file) {
    console.time('SlippiTotal');
    const { default: SlippiGame } = require('@slippi/slippi-js');

    console.time('SlippiRead');
    const filePath = path.join(rootDir, file);
    console.log(filePath);
    const game = new SlippiGame(filePath);
    console.timeEnd('SlippiRead');

    console.time('SlippiGet');

    const metadata = game.getMetadata();
    //console.log(metadata);

    if(!metadata) {
        return
    }
    const duration = Math.round(metadata.lastFrame/60);

    if (duration < MIN_GAME_LENGTH_SECONDS) {
        return;
    }

    const settings = game.getSettings();
    const stats = game.getStats();
    console.timeEnd('SlippiGet');
  

    console.time('SlippiBuild');
    const players = metadata.players;
    const playerId = (players[0].names.code === PLAYER_CODE) ? 0 : 1;
    const oppId = (players[0].names.code === PLAYER_CODE) ? 1 : 0;

    const playerStats = stats.overall[playerId];
   
    var Win;

    if (stats.overall[playerId].killCount === 4) { 
        Win = 1 ;
    } else { 
        if(stats.overall[oppId].killCount === 4){
            Win = 0;
        } else {
            return;
        }
    };




    const gameInfo = {
        //Games Table
        StartTime: metadata.startAt,
        Character: getCharNameByIndex(settings.players[playerId].characterId),
        OppCharacter: getCharNameByIndex(settings.players[oppId].characterId),
        Stage: getStageNameByIndex(settings.stageId),
        Duration: duration,
        DidWin: Win,
        Kills: playerStats.killCount,
        totalDmg: playerStats.totalDamage,
        Openings: playerStats.conversionCount,
        Conversions: playerStats.successfulConversions.count,
        NeutralOp: playerStats.neutralWinRatio.count,
        NeutralOpTotal: playerStats.neutralWinRatio.total,
        CHOpening: playerStats.counterHitRatio.count,
        CHOpeningTotal: playerStats.counterHitRatio.total,
        beneficalTrades: playerStats.beneficialTradeRatio.count,
        beneficalTradesTotal: playerStats.beneficialTradeRatio.total,
        IPM: playerStats.inputsPerMinute.ratio,
        FileName: file
    }
    console.timeEnd('SlippiBuild');

    
    console.timeEnd('SlippiTotal');
   return gameInfo;

}



// function buildInstertQuery(gameInfo) {
//     const sql =  'INSERT INTO "main"."Games" ("StartTime", "Character", "OppCharacter", "Stage", "Duration", "DidWin", "FileName") VALUES ' +
//                     `('${gameInfo.StartTime}', '${gameInfo.Character}', '${gameInfo.OppCharacter}', ${gameInfo.Stage}, ${gameInfo.Duration}, ${gameInfo.DidWin}, '${gameInfo.FileName}');`;             
//     return sql;
// }


exports.checkNewFiles = checkNewFiles;