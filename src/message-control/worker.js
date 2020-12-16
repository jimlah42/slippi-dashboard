const { ipcRenderer } = require('electron');
const { checkNewFiles } = require('../file-handling/loadFiles');
const { getWins, getLosses } = require('../db-calls/getWL');

ipcRenderer.on('check-new-files', async function(event){
    console.log('Got msg');
    ipcRenderer.send('loading-new-files');
    const noOfFiles = await checkNewFiles();
    console.log('loading-new-files ' + noOfFiles);
    
    console.log('finished');
  })


ipcRenderer.on('get-w/l', async function(event, args){
  const wins = await getWins(args);
  const losses = await getLosses(args);
  console.log(wins + '/' + losses);
  ipcRenderer.send('win/loss', {wins: wins, losses: losses});
});

async function testWL() {
  const wins = await getWins({Character: 'Falco', OppCharacter: 'Falco'});
  const losses = await getLosses({Character: 'Falco', OppCharacter: 'Falco'});
  console.log(wins + '/' + losses);
}

// let win = getLosses({Character: 'Falco', OppCharacter: 'Falco'});
// win.then(function(result) {
//   console.log(result[0].Wins);
// });
testWL();
