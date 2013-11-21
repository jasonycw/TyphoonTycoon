/*
	Game - handle game logic, include 2 part : 
	1. init  
	2. loop
 */
define([
	'stage',
	'models/ui',
	'utility',
	'config',
	'units/tower',
	'units/attackTower',
	'units/unit',
	'units/enemy',
	'underscore'
	], function(Stage, UI, Utility, Config, Tower, AttackTower, Unit, Enemy, _) {

	console.log("game.js loaded");

	var Game = (function() {
		// Game canvas
		var stage;

		var gameUI;	//TODO should change the name to map or background

		var lastTime;
		var gameTime = 0;

		return {
			// Initialize the game
			init: function() {
				//console.log("Game.init() loaded");
				try {
					stage = new Stage('game-canvas');
				} catch(e) {
					alert('Cannot obtain the canvas context.');
					return;
				}

				// create background map
				gameUI = new UI();
				gameUI.init();
				Stage.addChild(gameUI,'backdrops');

			    //Start game loop when initial
				this.reset();
			    lastTime = Date.now();
			    this.loop();
				
				//setup experiment/testing
				this.testSetup();

			},	//End init

			reset: function() {
				//console.log("Game.rest() loaded");

				//TODO if necessary
			},
			/*
				main game loop
			 */
			loop: function() {
				//console.log("Game.loop() loaded");

				var now = Date.now();
			    var dt = (now - lastTime) / 1000.0;

			    Game.tick(dt);
			    stage.render();

			    lastTime = now;
			    requestAnimFrame(Game.loop);
			},

			/*
				tick() : 
				- handling input event
			 	- handling game level change 
			 	  - create enemy
			 	  	- different type
			 	  	- different strength 
			 	- handling random game event (eg. disaster)
			http://jlongster.com/Making-Sprite-based-Games-with-Canvas
			https://github.com/jlongster/canvas-game-bootstrap/blob/a878158f39a91b19725f726675c752683c9e1c08/js/app.js#L22
			*/			
			tick: function(dt)
			{
				
				gameTime += dt;

			    this.handleInput(dt);
			    this.updateEntities(dt);

			    // It gets harder over time by adding enemies using this
			    // equation: 1-.993^gameTime
			    if(Math.random() < 1 - Math.pow(.993, gameTime)) {
			        // enemies.push({
			        //     pos: [canvas.width,
			        //           Math.random() * (canvas.height - 39)],
			        //     sprite: new Sprite('img/sprites.png', [0, 78], [80, 39],
			        //                        6, [0, 1, 2, 3, 2, 1])
			        // });
			    }

			    //checkCollisions();
			    //scoreEl.innerHTML = score;
			   
			  
			  	this.testLoop();
			  
			}, //End tick()
			handleInput: function (dt) {
				// body...
			},
			updateEntities: function (dt) {
				_.each(Stage.displayList, function(renderList) {
					_.each(renderList, function(item) {
						if (item && (typeof item.tick === 'function')) {
							item.tick(dt);
						}
					})
				});
			},
			/*
				isolate following testing code, there are 2 function for 2 different kind of code
				- testSetup() : for static or event-base code
				- testLoop()  : for time-base code
			 */
			testSetup: function() {

				/*
					Create Tower when mouse click
				 */
				/*stage.canvas.addEventListener('click', function(event){
					var mousePos = Utility.getMouse(event);
					var tower = new AttackTower(mousePos.x, mousePos.y, "sprite/tower.png");
					//console.log(tower instanceof Unit);// uncomment to test the hierachy
				});*/

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
					t = new Enemy(xx, yy, "img/typhoon.png" );
					var hk_dir = Utility.pointDirection(	xx,
															yy,
															Config.hkArea.x,
															Config.hkArea.y  );
					t.setMotion(hk_dir,Math.random()*3);	//Math.random()*360 ,2 );
					
					//uncomment to test static method
					//console.log(Stage.width);

					//t.setForce({dir:hk_dir+170,mag:0.007});
				},1000);

				/*
				setInterval(function(){
				//console.log(Stage.displayList['typhoons']);
					_.each(Stage.displayList['typhoons'], function(typhoon) {
						//console.log(typhoon);
						_.each(Stage.displayList['towers'], function(tower){
							var distanceFromTyphoonToTower = Utility.pointDistance(tower.x,tower.y,typhoon.x,typhoon.y);
							typhoon.addMotion(Utility.pointDirection(tower.x,tower.y,typhoon.x,typhoon.y),3000/distanceFromTyphoonToTower/distanceFromTyphoonToTower);
						});
					});
				},100);
				*/

			},//End testSetup()
			testLoop: function() {

			}

		}//End return
	})();
	
	return Game;
});