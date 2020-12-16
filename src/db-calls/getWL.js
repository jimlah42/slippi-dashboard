var knex = require("knex") ({
    client: "sqlite3",
    connection: {
        filename: "./public/db.sqlite3"
    }
});

async function getWins(params) {
    let result = await knex('Games').count({ Wins: '*' })
        .where({DidWin: 1})
        .andWhere({Character: params.Character})
        .andWhere({OppCharacter: params.OppCharacter});
    return result[0].Wins;
}

async function getLosses(params) {
    const result = await knex('Games').count({ Losses: '*' })
        .where({DidWin: 0})
        .andWhere({Character: params.Character})
        .andWhere({OppCharacter: params.OppCharacter});
    console.log(result);
    return result[0].Losses;
}

exports.getWins = getWins;
exports.getLosses = getLosses;