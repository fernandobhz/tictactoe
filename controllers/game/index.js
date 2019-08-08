const uuidv4 = require('uuid/v4');

var games = [];

function gameFactory() {
	var game = {};
	game.id = uuidv4();
	game.firstPlayer = (Math.random() < 0.5 ? 'X' : 'O');
	game.previousPlayer = null;
	game.nextPlayer = game.firstPlayer;
	game.valid = true;
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

function checkWinner(game) {
	if ( game.valid == false ) return false;

	var player = game.previousPlayer;

	// HORIZONTAL LINES
	if ( // making the BOTTOM HORIZONTAL line
		game.table['x0y0'] == player
							&&
		game.table['x1y0'] == player
							&&
		game.table['x2y0'] == player
	) return true;

	if ( // making the MIDDLE HORIZONTAL line
		game.table['x0y1'] == player
							&&
		game.table['x1y1'] == player
							&&
		game.table['x2y1'] == player
	) return true;

	if ( // making the TOP HORIZONTAL line
		game.table['x0y2'] == player
							&&
		game.table['x1y2'] == player
							&&
		game.table['x2y2'] == player
	) return true;


	// VERTICAL LINES
	if ( // making the BOTTOM VERTICAL line
		game.table['x0y0'] == player
							&&
		game.table['x0y1'] == player
							&&
		game.table['x0y2'] == player
	) return true;

	if ( // making the MIDDLE VERTICAL line
		game.table['x1y0'] == player
							&&
		game.table['x1y1'] == player
							&&
		game.table['x1y2'] == player
	) return true;

	if ( // making the TOP VERTICAL line
		game.table['x2y0'] == player
							&&
		game.table['x2y1'] == player
							&&
		game.table['x2y2'] == player
	) return true;


	// DIAGONAL LINES
	if ( // making the LEFT RIGHT ASC line
		game.table['x0y0'] == player
							&&
		game.table['x1y1'] == player
							&&
		game.table['x2y2'] == player
	) return true;

	if ( // making the LEFT RIGHT DESC line
		game.table['x0y2'] == player
							&&
		game.table['x1y1'] == player
							&&
		game.table['x2y0'] == player
	) return true;

}

function checkDraw(game) {
	if ( game.valid == false ) return false;

	// To be a draw, every field must be different than null
	for ( key in game.table ) {
		if ( game.table[key] == null ) {
			return false;
		}
	}

	return true;
}


exports.newGame = function() {
	var game = gameFactory();
	games.push(game);

  return {
		id: game.id,
		firstPlayer: game.firstPlayer
	};
}

exports.listGames = function() {
  return games;
}

exports.movement = function(id, player, x, y) {

	// validation of input values
	if ( ! id )
		throw new Error('id faltando');

	if ( id.length != 36 )
		throw new Error('id tamanho invalido');

	if ( ! player )
		throw new Error('player faltando');

	if ( ! [0,1,2].includes(x) )
		throw new Error('x faltando ou incorreto');

	if ( ! [0,1,2].includes(y) )
		throw new Error('y faltando ou incorreto');
	

	// finding game
	var game = games.find(x => x.id == id);


	// validation of game
	if ( ! game )
		throw new Error('Partida não encontrada');

	if ( game.valid == false )
		throw new Error('Este jogo não é valido');

	if ( player != 'X' && player != 'O' )
		throw new Error('Jogador deve ser X ou O, recebido: ' + player);

	if ( player != game.nextPlayer )
		throw new Error('Não é turno do jogador');

	if ( game.table['x' + x + 'y' + y] != null) {
		game.valid = false;
		throw new Error('Esta jogada já foi feita, contate o suporte do front-end');
	}



	// Exchange the current player
	if ( player == 'X' ) {
		game.previousPlayer = player;
		game.nextPlayer = 'O';
	}	else if ( player == 'O' ) {
		game.previousPlayer = player;
		game.nextPlayer = 'X'
	}	else {
		// extra validation, theoretically not needed
		throw new Error('Erro interno, contate o suporte');
		return;
	}



	// Doing the movement
	game.table['x' + x + 'y' + y] = player;



	// Cheking if current player has won
	if ( checkWinner(game) ) {
		game.valid = false;

		return {
			msg: 'Partida finalizada',
			winner: game.previousPlayer
		}
	}



	// Check if game finished by draw
	if ( checkDraw(game) ) {
		game.valid = false;

		return {
			status: 'Partida finalizada',
			winner: 'Draw'
		}
	}

	return game
}
