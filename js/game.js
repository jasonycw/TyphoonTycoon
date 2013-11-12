// Game
define([
	'stage',
	'models/ui',
	'utility',
	'units/tower',
	'units/unit',
	'units/enemy'
], function(Stage, UI, Utility,Tower,Unit,Enemy) {

	console.log("game.js loaded");

	var Game = (function() {
		// Game canvas
		var stage;

		var gameUI;

		return {
			// Initialize the game
			init: function() {
				try {
					stage = new Stage('game-canvas');
				} catch(e) {
					alert('Cannot obtain the canvas context.');
					return;
				}
				gameUI = new UI();
				gameUI.init();
				stage.addBackdrop(gameUI);


				var typhoon1 = new Enemy(500, 500, "sprite/typhoon_placeholder.png");
					typhoon1._typhoonID = stage.addTyphoon(typhoon1);	// TODO: how to put this back to Tower's constructor?
					typhoon1.setMotion(270,2);
					typhoon1.setForce({dir:60,mag:0.01});


				stage.canvas.addEventListener('click', function(event){
					console.log(  $("#game")[0].offsetLeft  );
					var x = event.clientX - $("#game")[0].offsetLeft;
					var y = event.clientY - $("#game")[0].offsetTop;
					var tower = new Tower(x, y, "sprite/tower.png");
					tower.towerID = stage.addTower(tower);	// TODO: how to put this back to Tower's constructor?
					//console.log(tower instanceof Unit);// uncomment to test the hierachy
				});

				setInterval(function(){
					stage.render();
				},10);
			}
		}
	})();
	
	return Game;
});