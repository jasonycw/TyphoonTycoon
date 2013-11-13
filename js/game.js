// Game
define([
	'stage',
	'models/ui',
	'utility',
	'config',
	'units/tower',
	'units/unit',
	'units/enemy'
], function(Stage, UI, Utility, Config, Tower, Unit, Enemy) {

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
				Stage.addChild(gameUI,'backdrops');

				stage.canvas.addEventListener('click', function(event){
					console.log(  $("#game")[0].offsetLeft  );
					var x = event.clientX - $("#game")[0].offsetLeft;
					var y = event.clientY - $("#game")[0].offsetTop;
					var tower = new Tower(x, y, "sprite/tower.png");
					//done :)
					//tower.towerID = Stage.addChild(tower,'units');	// TODO: how to put this back to Tower's constructor?
					console.log(tower instanceof Unit);// uncomment to test the hierachy
				});

				setInterval(function(){
					stage.render();

				},10);
				setInterval(
					function(){
						var t;
						var canvas = $('#game-canvas')[0];
						//console.log(canvas);
						var xx,yy;
						if(Math.random()>0.5){
							xx = canvas.width;
							yy = Math.random() * canvas.height;
						}else{
							xx = Math.random() * canvas.width;
							yy = canvas.height;
						}
						t = new Enemy(xx, yy, "sprite/typhoon_placeholder.png" );
						//console.log(t);
						t.typhoonID = Stage.addChild(t,'typhoons');	// TODO: how to put this back to Tower's constructor?
						//console.log(Config.hkArea.x);
						var hk_dir = Utility.point_direction(xx,yy,Config.hkArea.x,Config.hkArea.y);
						console.log(hk_dir);
						t.setMotion(hk_dir,2);//Math.random()*360 ,2 );
						
						//uncomment to test static method
						//console.log(Stage.width);
						
						//t.setForce({dir:hk_dir,mag:0.01});

					},
					3000);
			}
		}
	})();
	
	return Game;
});