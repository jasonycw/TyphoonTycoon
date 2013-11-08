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

		return {
			// Initialize the game
			init: function() {
				console.log('init game');
				this.stage = new createjs.Stage("game-canvas");
				var mapBackground = new createjs.Bitmap("../img/temp_map.JPG");
				stage.addChild(mapBackground);
				stage.update();
				createjs.Ticker.setFPS(30);
			}
		}
	})();
	
	return Game;
});