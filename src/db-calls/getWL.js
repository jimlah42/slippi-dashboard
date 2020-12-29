var knex = require("knex") ({
    client: "sqlite3",
    connection: {
        filename: "./public/db.sqlite3"
    }
});

async function getWinLoss(params) {
  const wins = await getWins(params);
  const losses = await getLosses(params);
  return {wins: wins, losses: losses};
}


async function getWins(params) {
    const result = await knex('Games').count({ Wins: '*' })
        .where((builder) => {
            builder.where({DidWin: 1});
            if(params.Character !== '*') {
                builder.andWhere({Character: params.Character});
            }
            if(params.OppCharacter !== '*') {
                builder.andWhere({OppCharacter: params.OppCharacter});
            }
        })
        
        console.log(result);
        return result[0].Wins;
}

async function getLosses(params) {
    const result = await knex('Games').count({ Losses: '*' })
    .where((builder) => {
        builder.where({DidWin: 0});
        if(params.Character !== '*') {
            builder.andWhere({Character: params.Character});
        }
        if(params.OppCharacter !== '*') {
            builder.andWhere({OppCharacter: params.OppCharacter});
        }
    })
    
    console.log(result);
    return result[0].Losses;
   
}

exports.getWins = getWins;
exports.getLosses = getLosses;
exports.getWinLoss = getWinLoss;