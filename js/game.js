// Game
define([
	'stage',
	'models/ui',
	'utility'
], function(Stage, UI, Utility) {

	console.log("game.js loaded");

	var Game = (function() {
		// Game canvas
		var stage;

		var gameUI;

		return {
			// Initialize the game
			init: function() {
				//stage = document.getElementById('game-canvas');
				stage = new Stage('game-canvas');
				gameUI = new UI(stage);
				gameUI.init();
				stage.addChild(gameUI);
			}
		}
	})();
	
	return Game;
});