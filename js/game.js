// Game
define([
	'stage',
	'models/ui',
	'utility',
	'config',
	'units/tower',
	'units/unit',
	'units/enemy'
	'test'
], function(Stage, UI, Utility, Config, Tower, Unit, Enemy) {

	console.log("game.js loaded");

	var Game = (function() {
		// Game canvas
		var stage;

		var gameUI;	//TODO should change the name to map or background

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


				//Start game loop when initial
				setInterval(function(){
					stage.render();
				},10);

				/***************************************************************/

				/* TODO
					Click event handling
					- click the button for select different type of tower
						- if then click the map, create the corresponding type of tower
						- press escape for cancel all selection
					- click the existing tower for selection (in order to select for upgrade specific tower) 
				 */ 


				//TODO: isolate following testing code

				/*
					Create Tower when mouse click
				 */
				stage.canvas.addEventListener('click', function(event){
					console.log(  $("#game")[0].offsetLeft  );
					var x = event.clientX - $("#game")[0].offsetLeft;
					var y = event.clientY - $("#game")[0].offsetTop;
					var tower = new Tower(x, y, "sprite/tower.png");
					//console.log(tower instanceof Unit);// uncomment to test the hierachy
				});

				/*
					Create Typhoon at interval time
				 */
				setInterval(function(){
					var t;
					var xx,yy;
					if(Math.random()>0.5){
						xx = Stage.width;
						yy = Math.random() * Stage.height;
					}else{
						xx = Math.random() * Stage.width;
						yy = Stage.height;
					}
					t = new Enemy(xx, yy, "sprite/typhoon_placeholder.png" );
					var hk_dir = Utility.pointDirection(	xx,
															yy,
															Config.hkArea.x,
															Config.hkArea.y  );
					t.setMotion(hk_dir,2);	//Math.random()*360 ,2 );
					
					//uncomment to test static method
					//console.log(Stage.width);

					t.setForce({dir:hk_dir+170,mag:0.007});
				},1000);

				/***************************************************************/				

			}
		}
	})();
	
	return Game;
});