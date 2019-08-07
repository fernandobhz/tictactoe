const uuidv1 = require('uuid/v1');

var games = [{id: 1, firstPlayer: 'X'}];
var winPossibilities = [];

function gameFactory() {
	var game = {};	
	game.id = uuidv1();	
	game.firstPlayer = (Math.random() < 0.5 ? 'X' : 'O');
	
	return game;
}

exports.newGame = function(req, res, next) {
	var game = gameFactory();
	games.push(game);	
  res.json(game);
}

exports.listGames = function(req, res, next) {	
  res.json(games);
}

exports.movement = function(req, res, next) {
	req.body.method = 'movement';
	req.body.id = req.params.id;
	res.json(req.body);
}
