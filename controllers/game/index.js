const uuidv4 = require('uuid/v4');

var games = [];
var winPossibilities = [{x:0, y:1}];

function gameFactory() {
	var game = {};
	game.id = uuidv4();
	game.firstPlayer = (Math.random() < 0.5 ? 'X' : 'O');
	game.table = {
		x0y2: null,
		x1y2: null,
		x2y2: null,
		
		x0y1: null,
		x1y1: null,
		x2y1: null,
				
		x0y0: null,
		x1y0: null,
		x2y0: null,
	}
	
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
	//var game = games.find(x => x.id = req.params.id);
	//res.json(game);
	//return;

	
	
	req.body.method = 'movement';
	req.body.id = req.params.id;
	res.json(req.body);
}
