$.ajaxSetup({
	contentType: "application/json; charset=utf-8"
});

$(function() {
	$(".movementButton").each(function() {
		$(this).html($(this).attr("data-x") + ', ' + $(this).attr("data-y"));
	});
});

function newGame() {
	$.post("/game", function(data) {
		window.game = data;
		window.currentPlayer = data.firstPlayer;

		$("#gameId").html(data.id);
		$("#firstPlayer").html(data.firstPlayer);
		
		if ( data.firstPlayer == 'X' ) {
			$("#nextPlayer").html('X');
			$("#nextPlayer").css('color', 'red');
		} else { 
			$("#nextPlayer").html('O');
			$("#nextPlayer").css('color', 'blue');
		}
	});
}

function doMovement(elm) {
	var x = $(elm).attr("data-x");
	var y = $(elm).attr("data-y");

	$(elm).html(currentPlayer);
	
	if ( window.currentPlayer == 'X' ) $(elm).css('color', 'red')
	else $(elm).css('color', 'blue');
	
	var postUrl = "/game/" + window.game.id + "/movement";
	
	var postData = JSON.stringify({
		"id" : window.game.id,
		"player": window.currentPlayer,
		"position": {
			"x": x,
			"y": y
		}
	});

	$.post(postUrl, postData, function(data, txtStatus, xhr) {				
		$("#responseCode").html(xhr.status + " - " + txtStatus);
		$("#responseData").html(JSON.stringify(data, null, 4));
		
		if ( data.msg == 'Partida finalizada' ) {
			alert('Winner: ' + data.winner);
			location.reload();
		};
		
		if ( data.status == 'Partida finalizada' ) {
			alert('Empate');
			location.reload();
		};
		
		$("#nextPlayer").html(data.nextPlayer);
		if ( data.nextPlayer == 'X' ) {
			$("#nextPlayer").css('color', 'red');
		} else { 
			$("#nextPlayer").css('color', 'blue');
		}				
		
		if ( window.currentPlayer == 'X' ) window.currentPlayer = 'O'
		else window.currentPlayer = 'X';
	}).fail(function(xhr, txtStatus, error) {
		$("#responseCode").html(xhr.status + " - " + txtStatus);
		$("#responseData").html(JSON.stringify(xhr.responseJSON, null, 4) + xhr.responseText);				
		
		try {				
			if ( xhr.responseJSON.msg == 'Esta jogada já foi feita, contate o suporte do front-end' ) {						
				alert("Recebemos a informação do back-end que essa jogada já foi feita, iremos reiniciar o jogo");
				location.reload();
			}
		} catch(ex) {
			//nothing to do here
		}
	});
}
