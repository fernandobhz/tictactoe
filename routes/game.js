var express = require('express');
var router = express.Router();
var gameController = require('../controllers/game');

router.post('/', gameController.newGame);

router.get('/list', gameController.listGames);

router.post('/:id/movement', gameController.movement);

module.exports = router;
