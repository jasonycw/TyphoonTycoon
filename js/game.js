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
	'units/unit',
	'units/enemy'
	], function(Stage, UI, Utility, Config, Tower, Unit, Enemy) {

	console.log("game.js loaded");

	var Game = (function() {
		// Game canvas
		var stage;

		var gameUI;	//TODO should change the name to map or background

		var lastTime;

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
				update() 
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
				/*
				gameTime += dt;

			    handleInput(dt);
			    updateEntities(dt);

			    // It gets harder over time by adding enemies using this
			    // equation: 1-.993^gameTime
			    if(Math.random() < 1 - Math.pow(.993, gameTime)) {
			        enemies.push({
			            pos: [canvas.width,
			                  Math.random() * (canvas.height - 39)],
			            sprite: new Sprite('img/sprites.png', [0, 78], [80, 39],
			                               6, [0, 1, 2, 3, 2, 1])
			        });
			    }

			    checkCollisions();
			    scoreEl.innerHTML = score;
			   */
			  
			  	this.testLoop();
			  
			}, //End tick()

			/*
				isolate following testing code, there are 2 function for 2 different kind of code
				- testSetup() : for static or event-base code
				- testLoop()  : for time-base code
			 */
			testSetup: function() {

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

			},//End testSetup()
			testLoop: function() {

			}

		}//End return
	})();
	
	return Game;
});