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
	'units/enemy',
	'models/mapHitArea',
	'models/earthquake',
	'models/buildEffect',
	'underscore' //must be last item
	], function(Stage, UI, Utility, Config, Tower, Unit, Enemy, MapHitArea, Earthquake, BuildEffect, _) {

	console.log("game.js loaded");

	var Game = (function() {
		// Game canvas
		// var stage;

		// var gameUI;

		// var lastTime;
		// var gameTime = 0;
		that = this;
		return {
			stage: null,
			gameUI: null,
			lastTime: 0,
			gameTime: 0,
			powerQuota: 0,
			powerUsed: 0,
			hsi: 0,
			cash: 0,
			level:1,
			enemyCounter: 0,
			minAmongOfEnemy: 0,
			maxAmongOfEnemy: 0,
			updateHSIIntervalID: null,
			Built: {
				university: false,
				researchCenter: false,
				cheungKongLimited: false
			},
			// Initialize the game
			init: function() {
				console.log("Game.init() loaded");
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
				Stage.addChild(gameUI, 'backdrops');

				//Start game loop when initial
				this.reset();
				lastTime = Date.now();
				this.loop();

				updateHSIIntervalID = setInterval(function(){
					Game.updateHSI();
				}, 100 );


				
				//setup experiment/testing
				this.testSetup();

			},	//End init

			reset: function() {
				hsi = Config.HSI.init;
				cash = 0;
				gameTime = 0;
				powerQuota = powerUsed = 0;
				gameUI.setHsiDisplayValue(hsi);
				gameUI.setPowerBar(0, 0);

				minAmongOfEnemy = Config.enemy.intiMinAmong;
				maxAmongOfEnemy = Config.enemy.intiMaxAmong;
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

				gameUI.setPowerBar(powerQuota - powerUsed, powerQuota);

				// Save the values for the tick methods in towers next time
				// prevInputPower = inputPower;
				// prevConsumePower = consumePower;
				// prevTotalPower = totalPower;
				// // Electricity cannot be stored because we don't have such a large battery in real world!
		  //   	totalPower = consumePower = inputPower = 0;
		  		if (hsi <= 0) {
		  			gameUI.showGameOver(that);
		  			clearInterval(updateHSIIntervalID);
		  		} else {
					requestAnimFrame(Game.loop);
		  		}
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

				if( gameTime > Config.enemy.initDelay)
				{
					//reset and next level 
					if(this.enemyCounter >= maxAmongOfEnemy)
					{	
						maxAmongOfEnemy+=(minAmongOfEnemy*2);
						minAmongOfEnemy+=1;
						this.level+=1;
						console.log('Level Up ->'+this.level);
						gameTime = Config.enemy.initDelay;
						this.enemyCounter = 0;

						//random time launch a eathquake in each level
						for (var i = minAmongOfEnemy - 1; i >= 0; i--) {
							setTimeout(function(){
								var targetX = Config.hkArea.x + Math.random()*600 - 300;
								var targetY = Config.hkArea.y + Math.random()*600 - 300;
								var earthquake = new Earthquake(targetX, targetY);
							}, Math.random * 60000);
							
						};
					}
					/*
						Create Enemies with time increasing
						- It gets harder over time by adding enemies using this
						- orginial equation: 1-.993^gameTime
						
					 */
					if (Math.random() < 1 - Math.pow(.993, gameTime / Config.enemy.difficulty)) {

						for (var i = minAmongOfEnemy - 1; i >= 0; i-=1) {
							var t,
								xx,
								yy;
							if (Math.random() > 0.5) {
								xx = Stage.width;
								yy = Math.random() * Stage.height;
							} else {
								xx = Math.random() * Stage.width;
								yy = Stage.height;
							}//End if

							//TODO: change different kind of enemies
							t = new Enemy(xx, yy, "img/typhoon.png");
							var hk_dir = Utility.pointDirection(
								xx,	yy,
								Config.hkArea.x, Config.hkArea.y);
							t.setMotion(hk_dir+Math.random()*120-60, Math.random() * this.level+1 +0.5);
							console.log('Enemy:'+t.typhoonID, 'HP:'+t.hp);
							this.enemyCounter+=1;
						}; //End for

					}//End if

					//console.log('this.enemyCounter:'+this.enemyCounter, 'gameTime:'+gameTime);

				}//End if

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

				var penalty = 0;
				//check any typhoon within the circle
				//TODO could be optimize
				//
				that = this;
				var hsiChange = (Config.HSI.increment+Math.round(Math.random()*Config.HSI.upperOfRandom)+Math.round(Math.random()*Config.HSI.lowerOfRandom));
				if(that.built.cheungKongLimited)
					hsiChange *= Config.cheungKong.hsiIncrementMultiplier;
				for (var i = Stage.displayList['typhoons'].length - 1; i >= 0; i--) {
					var e = Stage.displayList['typhoons'][i];
					var distance;
					try{
						distance = Utility.pointDistance(Config.hkArea.x, Config.hkArea.y, e.x, e.y);
					} catch(err){}
					finally{
						if( !isNaN(distance)  && e!=null){
							// console.log(Config.enemy.damage*(Config.hkArea.effectAreaRadius-Math.round(distance)));
							if(distance <= Config.hkArea.effectAreaRadius)
							{
								console.log(Config.enemy.damage*(Config.hkArea.effectAreaRadius-Math.round(distance)));
								hsiChange = -(Config.enemy.damage*Math.round((Config.hkArea.effectAreaRadius-Math.round(distance))*0.1));
							}

							// if( distance > (Config.hkArea.radius/2+e.radius) &&  distance <= (Config.hkArea.radius+e.radius)) {
							// 	console.log("inside outer circle");

							// 	if(hsiInterest > 0)
							// 		hsiInterest = hsiInterest - hsiInterest/5;
							// 	else
							// 		hsiInterest = hsiInterest + hsiInterest/5;


							// 	// penalty = -( Math.random() * hsiInterest ) - 20;
								
							// }
							// else if (distance < (Config.hkArea.radius/2+e.radius) )
							// {
							// 	console.log("inside inner circle");


							// 	if(hsiInterest > 0)
							// 		hsiInterest = hsiInterest - hsiInterest/3;
							// 	else
							// 		hsiInterest = hsiInterest + hsiInterest/3;

							// 	penalty =  -( Math.random() * hsiInterest * 3 ) - 100;

							// }//End if 

							// // if(distance <= Config.hkArea.effectAreaRadius)
							// // {
							// // 	console.log("HSI before damage:  " + hsi);
							// // 	hsi -= Config.enemy.damage;
							// // 	console.log("HSI after damage:  " + hsi);
							// // }
						}//End if

					}//End try..finally
				} //End for
				// if (penalty > 0) penalty *= -1;
				// hsiInterest += Math.random()*Config.HSI.increment + penalty;
				// console.log("hsiInterest:" +hsiInterest, "penalty:" + penalty);
				// hsi += Math.round(hsiInterest);
				// this.setHSI(hsi);


				this.affectHSI(hsiChange);
				gameUI.setHsiDisplayValue(hsi);
				//console.log(hsi, hsiInterest);
			},
			addPower: function(p) {
				if (p > 0) {
					powerQuota += p;
				} else if (p < 0) {
					powerUsed -= p; 
				}
				// totalPower += p;
			},
			reducePower: function(p)
			{
				powerQuota -= p;
			},
			getAvailablePower: function() {
				return powerQuota-powerUsed;
			},
			getHSI: function() {
				return hsi;
			},
			//just getter, will not display 
			setHSI: function(value) {
				hsi = value;
			},
			affectHSI: function(value) {
				hsi += value;
			},
			built: function(name) {
				var that = this;
				if(name == "University")
					that.Built.university = true;
				if(name == "ResearchCenter")
					that.Built.researchCenter = true;
				if(name == "CheungKongLimited")
					that.Built.cheungKongLimited = true;
			},
			isBuilt: function(name) {
				var that = this;
				if(name == "University")
					return that.Built.university;
				if(name == "ResearchCenter")
					return that.Built.researchCenter;
				if(name == "CheungKongLimited")
					return that.Built.cheungKongLimited;
			},
			/*
				isolate following testing code, there are 2 function for 2 different kind of code
				- testSetup() : for static or event-base code
				- testLoop()  : for time-base code
			 */
			testSetup: function() {

				/**
				 * test earthquake
				 */
				// setInterval(function(){
				// 	var targetX = Config.hkArea.x + Math.random()*40 - 20;
				// 	var targetY = Config.hkArea.y + Math.random()*40 - 20;
				// 	var earthquake = new Earthquake(targetX, targetY);
				// }, 3000);

				/*
					Create Tower when mouse click
				 */
				/*stage.canvas.addEventListener('click', function(event){
					var mousePos = Utility.getMouse(event);
					var tower = new AttackTower(mousePos.x, mousePos.y, "sprite/tower.png");
					//console.log(tower instanceof Unit);// uncomment to test the hierachy
				});*/

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
			}//End testSetup()

		}//End return
	})();
	
	return Game;
});