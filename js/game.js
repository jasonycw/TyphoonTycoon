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
	'models/mapHitArea',
	'underscore'
	], function(Stage, UI, Utility, Config, Tower, AttackTower, Unit, Enemy, MapHitArea, _) {

	console.log("game.js loaded");

	var Game = (function() {
		// Game canvas
		var stage;

		var gameUI;

		var lastTime;
		var gameTime = 0;

		return {
			powerQuota: 0,
			powerUsed: 0,
			hsi: 0,
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
				MapHitArea.init();
				Stage.addChild(gameUI,'backdrops');

				//Start game loop when initial
				this.reset();
				lastTime = Date.now();
				this.loop();
				
				//setup experiment/testing
				this.testSetup();

			},	//End init

			reset: function() {
				hsi = Config.initHSI;
				gameTime = 0;
				powerQuota = powerUsed = 0;
				// prevInputPower = prevConsumePower = prevTotalPower = inputPower = consumePower = totalPower = 0;
				gameUI.setHSI(hsi);
				gameUI.setPowerBar(0, 0);
			},
			/*
				main game loop
			 */
			loop: function() {
				// var beforePower = totalPower

				var now = Date.now();
				var dt = (now - lastTime) / 1000.0;

				Game.tick(dt);
				stage.render();

				lastTime = now;
				requestAnimFrame(Game.loop);

			    //TODO change HSI 

			    gameUI.setHSI(hsi);
			    // console.log(totalPower +" "+ consumePower +" "+ inputPower)
				gameUI.setPowerBar(powerQuota - powerUsed, powerQuota);

				// Save the values for the tick methods in towers next time
				// prevInputPower = inputPower;
				// prevConsumePower = consumePower;
				// prevTotalPower = totalPower;
				// // Electricity cannot be stored because we don't have such a large battery in real world!
		  //   	totalPower = consumePower = inputPower = 0;
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
				this.updateEntities(dt);

				if(dt < 1){         // fix bug coused by lag
					gameTime += dt;
				}

				this.updateEntities(dt);
				/*
					Create Enemies with time increasing
					- It gets harder over time by adding enemies using this
					- orginial equation: 1-.993^gameTime
					
					TODO: change different kind of enemies
				 */
				var difficultLevel = 15; // larger is easier

				if (Math.random() < 1 - Math.pow(.993, gameTime / difficultLevel)) {
					var t,
						xx,
						yy;
					if (Math.random() > 0.5) {
						xx = Stage.width;
						yy = Math.random() * Stage.height;
					} else {
						xx = Math.random() * Stage.width;
						yy = Stage.height;
					}
					t = new Enemy(xx, yy, "img/typhoon.png");
					var hk_dir = Utility.pointDirection(xx,
						yy,
						Config.hkArea.x,
						Config.hkArea.y);
					t.setMotion(hk_dir, Math.random() * 2+0.5);
				}

				//checkCollisions();
				//scoreEl.innerHTML = score;
			   
			  
			}, //End tick()
			updateEntities: function (dt) {
				//console.time("updateEntities");
				_.each(Stage.displayList, function(renderList) {
					_.each(renderList, function(item) {
						if (item && (typeof item.tick === 'function')) {
							item.tick(dt);
						}
					})
				});
				//console.timeEnd("updateEntities");
			},
			/*
				update HSI
			 */
			updateHSI: function () {
				
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

				// /*
				// 	Create Typhoon at interval time
				//  */
				// setInterval(function(){
				// 	var t;
				// 	var xx,yy;
				// 	if(Math.random()>0.5){
				// 		xx = Stage.width;
				// 		yy = Math.random() * Stage.height;
				// 	}else{
				// 		xx = Math.random() * Stage.width;
				// 		yy = Stage.height;
				// 	}
				// 	t = new Enemy(xx, yy, "img/typhoon.png" );
				// 	var hk_dir = Utility.pointDirection(	xx,
				// 											yy,
				// 											Config.hkArea.x,
				// 											Config.hkArea.y  );
				// 	t.setMotion(hk_dir,Math.random()*5);	//Math.random()*360 ,2 );
					
				// 	//uncomment to test static method
				// 	//console.log(Stage.width);

				// 	//t.setForce({dir:hk_dir+170,mag:0.007});
				// },1000);

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
			addPower: function(p) {
				if (p > 0) {
					powerQuota += p;
				} else if (p < 0) {
					powerUsed -= p; 
				}
				// totalPower += p;
			},
			getAvailablePower: function() {
				return powerQuota-powerUsed;
			}

		}//End return
	})();
	
	return Game;
});