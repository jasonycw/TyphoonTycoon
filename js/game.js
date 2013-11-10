// Game
define([
	"easel",
	"models/ui",
	"models/player",
	"units/bullet",
	"units/enemy",
	"units/building",
	"utility"
], function(easel, UI, Player, Bullet, Enemy, Building, Utility) {

	console.log("game.js loaded");

	var Game = (function() {
		// Game canvas
		var stage;

		var gameUI;

		return {
			// Initialize the game
			init: function() {
				stage = new createjs.Stage("game-canvas");
				gameUI = new UI(stage);
				gameUI.init();
				
				createjs.Ticker.setFPS(30);
			}
		}
	})();
	
	return Game;
});