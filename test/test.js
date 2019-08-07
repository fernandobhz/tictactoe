const assert = require('assert');
const expect = require('chai').expect;
const should = require('chai').should();
const gc = require('../controllers/game');

function excludeElement(arr, elm) {
	var ret = [];

	for ( value of arr ) {
			if ( value != elm ) {
				ret.push(value);
			}
	}

	return ret;
}

describe('New Game', function () {
	it('Shoud return the GAME OBJECT WITH ID AND FIRSTPLAYER', function () {
		const game = gc.newGame();
		
		expect(game).to.be.an('object');
		expect(game).to.have.all.keys('id', 'firstPlayer');		
		expect(game.id.length).to.be.equal(36);		
		expect(['X', 'O']).to.include(game.firstPlayer);		
	});

	it('Shoud NOT THROW EXCEPTION ON FIRST MOVEMENT', function () {
		const game = gc.newGame();
		gc.movement(game.id, game.firstPlayer, 0, 0);
	});
	
	it('Should warning about the WRONG PLAYER TURN ', function () {
		const game = gc.newGame();
		
		expect(function() {
			gc.movement(game.id, (game.firstPlayer == 'X' ? 'O' : 'X'), 0, 0);
		}).to.throw('Não é turno do jogador');
		
	});

});

describe('Missing API field', function () {
	
	it('Should warning about the MISSING ID field', function () {
		const game = gc.newGame();
		
		expect(function() {
			gc.movement(null, game.firstPlayer, 0, 0);
		}).to.throw('id faltando');
		
	});

	it('Should warning about the MISSING PLAYER field', function () {
		const game = gc.newGame();
		
		expect(function() {
			gc.movement(game.id, null, 0, 0);
		}).to.throw('player faltando');
	});

	it('Should warning about the MISSING X position field', function () {
		const game = gc.newGame();
		
		expect(function() {
			gc.movement(game.id, game.firstPlayer, null, 0);
		}).to.throw('x faltando ou incorreto');
	});

	it('Should warning about the MISSING Y position field', function () {
		const game = gc.newGame();
		
		expect(function() {
			gc.movement(game.id, game.firstPlayer, 0, null);
		}).to.throw('y faltando ou incorreto');
	});

});

/*
describe('Invalid values field on API call', function () {
	it('Should warning about the wrong id / missing game', function () {
		const game = gc.newGame();
	});

	it('Should warning about the wrong player value', function () {
		const game = gc.newGame();
	});

	it('Should warning about the wrong x position less then 0', function () {
		const game = gc.newGame();
	});

	it('Should warning about the wrong y position less then 0', function () {
		const game = gc.newGame();
	});

	it('Should warning about the wrong x position greater than then 2', function () {
		const game = gc.newGame();
	});

	it('Should warning about the wrong y position greater than then 2', function () {
		const game = gc.newGame();
	});

	it('Should warning about the wrong x values like lettes, special chars', function () {
		const game = gc.newGame();
	});

	it('Should warning about the wrong y values like lettes, special chars', function () {
		const game = gc.newGame();
	});

});

describe('Gaming simulation', function () {

	it('Should return a successfull X winner', function () {
		const game = gc.newGame();
	});

	it('Should return a successfull O winner', function () {
		const game = gc.newGame();
	});

	it('Should return a successfull Draw', function () {
		const game = gc.newGame();
	});

	it('Should not return exceptions, making all possibles games', function () {
		// Doing all possible games player
		return;
		
		const p1 = [
			{x: 0, y: 2},
			{x: 1, y: 2},
			{x: 2, y: 2},

			{x: 0, y: 1},
			{x: 1, y: 1},
			{x: 2, y: 1},

			{x: 0, y: 0},
			{x: 1, y: 0},
			{x: 2, y: 0}
		];

		for ( var i1 = 0; i1 < p1.length; i1++ ) {
			var v1 = p1[i1];
			var p2 = excludeElement(p1, v1);

			for ( var i2 = 0; i2 < p2.length; i2++ ) {
				var v2 = p2[i2];
				var p3 = excludeElement(p2, p2[i2]);

				for ( var i3 = 0; i3 < p3.length; i3++ ) {
					var v3 = p3[i3]
					var p4 = excludeElement(p3, v3);

					for ( var i4 = 0; i4 < p4.length; i4++ ) {
						var v4 = p4[i4];
						var p5 = excludeElement(p4, v4);

						for ( var i5 = 0; i5 < p5.length; i5++ ) {
							var v5 = p5[i5];
							var p6 = excludeElement(p5, v5);

							for ( var i6 = 0; i6 < p6.length; i6++ ) {
								var v6 = p6[i6];
								var p7 = excludeElement(p6, v6);

								for ( var i7 = 0; i7 < p7.length; i7++ ) {
									var v7 = p7[i7];
									var p8 = excludeElement(p7, v7);

									for ( var i8 = 0; i8 < p8.length; i8++ ) {
										var v8 = p8[i8];
										var p9 = excludeElement(p8, v8);

										for ( var i9 = 0; i9 < p9.length; i9++ ) {
											var v9 = p9[i9];

											var game = gc.newGame();

											gc.movement(game.id, game.player, v1.x, v1.y)
											game.player = (player == 'X' ? 'O' : 'X');

											gc.movement(game.id, game.player, v2.x, v2.y)
											game.player = (player == 'X' ? 'O' : 'X');

											gc.movement(game.id, game.player, v3.x, v3.y)
											game.player = (player == 'X' ? 'O' : 'X');

											gc.movement(game.id, game.player, v4.x, v4.y)
											game.player = (player == 'X' ? 'O' : 'X');

											gc.movement(game.id, game.player, v5.x, v5.y)
											game.player = (player == 'X' ? 'O' : 'X');

											gc.movement(game.id, game.player, v6.x, v6.y)
											game.player = (player == 'X' ? 'O' : 'X');

											gc.movement(game.id, game.player, v7.x, v7.y)
											game.player = (player == 'X' ? 'O' : 'X');

											gc.movement(game.id, game.player, v8.x, v8.y)
											game.player = (player == 'X' ? 'O' : 'X');

											gc.movement(game.id, game.player, v9.x, v9.y)											
										}
									}
								}
							}
						}
					}
				}
			}
		}

	});

});
*/