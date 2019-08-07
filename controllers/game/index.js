const uuidv4 = require('uuid/v4');

var games = [];
var winPossibilities = [{x:0, y:1}];

function gameFactory() {
	var game = {};
	game.id = uuidv4();
	game.firstPlayer = (Math.random() < 0.5 ? 'X' : 'O');
	game.previousPlayer = null;
	game.nextPlayer = game.firstPlayer;
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
		res.status(500).json({msg: 'O ID do jogo na url não corresponde ao ID passado na corpo da requisição'});
		return;
	}

	var game = games.find(x => x.id == req.params.id);

	if ( ! game ) {
		res.status(500).json({msg: 'Partida não encontrada'});
		return;
	}
	
	if ( player != 'X' && player != 'O' ) {
		res.status(500).json({msg: 'Jogador deve ser X ou O, recebido: ' + player});
		return;
	}
	
	if ( player != game.nextPlayer ) {
		res.status(500).json({msg: 'Não é turno do jogador'});
		return;
	}
	
	if ( x > 2 ) {
		res.status(500).json({msg: 'O valor de x deve ser menor ou igual a 2, recebido: ' + x});
		return;		
	}
	
	if ( y > 2 ) {
		res.status(500).json({msg: 'O valor de y deve ser menor ou igual a 2, recebido:' + y});
		return;		
	}
	
	if ( x < 0 ) {
		res.status(500).json({msg: 'O valor de x deve ser maior que 0, recebido: ' + x});
		return;		
	}
	
	if ( y < 0 ) {
	res.status(500).json({msg: 'O valor de y deve ser maior que 0, recebido: ' + y});
		return;		
	}
	
	game.table['x' + x + 'y' + y] = player;
	
	res.json(game);
	return;
}
