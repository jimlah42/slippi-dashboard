var express = require('express');
var router = express.Router();
var { default: SlippiGame } = require('@slippi/slippi-js');


var game = new SlippiGame("test.slp");

var stats = game.getStats();

var overallStats = stats.overall;

console.log(overallStats);

router.get('/', function(req, res , next) {
    res.send(overallStats)
});


module.exports = router;