// Game
define([
	'stage',
	'models/ui',
	'utility',
	'units/tower'
], function(Stage, UI, Utility,Tower) {

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
				gameUI = new UI(stage);
				gameUI.init();
				stage.addChild(gameUI);
				stage.canvas.addEventListener('click', function(event){
					var x = event.clientX - stage.canvas.offsetLeft;
					var y = event.clientY - stage.canvas.offsetTop;
					var tower = new Tower(x, y, "sprite/tower.png");
				});
			}
		}
	})();
	
	return Game;
});