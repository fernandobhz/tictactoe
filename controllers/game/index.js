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
	var { id, player, position } = req.body;
	var { x, y } = position;
	
	if ( id != req.params.id ) {
		res.status(500).send('Url ID does not match the body ID');
		return;
	}

	var game = games.find(x => x.id == req.params.id);

	if ( ! game ) {
		res.status(500).send('Could not found the game by the id provided');
		return;
	}
	
	if ( player != 'X' or player != 'O' ) {
		res.status(500).send('Player must be O or X');
		return;
	}
	
	if ( x > 2 ) {
		res.status(500).send('x value must be equal or less then 2');
		return;		
	}
	
	if ( y > 2 ) {
		res.status(500).send('y value must be equal or less then 2');
		return;		
	}
	
	if ( x < 0 ) {
		res.status(500).send('x value must greater then 0');
		return;		
	}
	
	if ( y < 0 ) {
		res.status(500).send('y value must greater then 0');
		return;		
	}
	
	game.table['x' + x + 'y' + y] = player;
	

	res.json(game);
	return;

	req.body.method = 'movement';
	req.body.id = req.params.id;
	res.json(req.body);
}
