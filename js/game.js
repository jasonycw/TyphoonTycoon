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

		function prepareBgImg() {
			var bgImg = new Image();
			bgImg.src = "img/map.png";
			bgImg.onload = function() {
				var mapBackground = new createjs.Bitmap(bgImg);
				stage.addChildAt(mapBackground, 0); // always at the back
				stage.update();
			};
		}

		return {
			// Initialize the game
			init: function() {
				stage = new createjs.Stage("game-canvas");

				prepareBgImg();
				
				createjs.Ticker.setFPS(30);
			}
		}
	})();
	
	return Game;
});