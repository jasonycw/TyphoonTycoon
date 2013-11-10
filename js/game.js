// Game
define([
	"jquery",
	"models/ui"
], function($, UI) {

	console.log("game.js loaded");

	var Game = (function() {
		// Game canvas
		var stage;
		var ctx;

		var gameUI;

		return {
			// Initialize the game
			init: function() {
				stage = document.getElementById('game-canvas');;
				ctx = stage.getContext && stage.getContext('2d');
				gameUI = new UI(ctx);
				gameUI.init();
			}
		}
	})();
	
	return Game;
});