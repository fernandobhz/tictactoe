var express = require('express');
var router = express.Router();
var gameController = require('../controllers/game');

router.post('/', function(req, res, next) {
	res.json( gameController.newGame() );	
});

router.get('/list', function(req, res, next) {
	res.json( gameController.listGames() );	
});

router.post('/:id/movement', function(req, res, next) {
	var { id, player, position } = req.body;
	var { x, y } = position;
	
	// Validations
	if ( id != req.params.id ) {
		res.status(500).json({msg: 'O ID do jogo na url não corresponde ao ID passado na corpo da requisição'});
		return;
	}
	
	try {
		res.json( gameController.movement(id, player, x, y) );
	} catch(ex) {
		res.status(500).json({msg: ex.message});	
	}
});

module.exports = router;
