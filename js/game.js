/*
	Game - handle game logic, include 2 part :
	1. init
	2. loop
 */
define([
	'underscore',
	'stage',
	'models/ui',
	'utility',
	'config',
	'units/tower',
	'units/unit',
	'units/enemy',
	'models/mapHitArea',
	'models/earthquake',
	'hsi',
	'models/toast',
	'models/signals/sigReset'
], function(_, Stage, UI, Utility, Config, Tower, Unit, Enemy, MapHitArea, Earthquake, HSI, Toast, SigReset) {


	var Game = (function() {
		var _intervalId = null;
		var earthquakeTimer = [];
		var frameId;
		var Built = {
			numberOfUniversity: 0,
			numberOfResearchCenter: 0,
			numberOfCheungKongLimited: 0,
		};
		return {
			firstRun: true,
			stage: null,
			gameUI: null,
			lastTime: 0,
			gameTime: 0,
			spawnTimer:0,
			powerQuota: 0,
			powerUsed: 0,
			hsi: new HSI(Config.HSI.init),
			cash: 0,
			level: 1,
			enemyCounter: 0,
			minAmountOfEnemy: 0,
			maxAmountOfEnemy: 0,
			earthquake:Earthquake,
			on:{
				reset: SigReset.get()
			},

			// Initialize the game
			init: function() {
				try {
					stage = new Stage('game-canvas');
				} catch (e) {
					alert('Cannot obtain the canvas context.');
					return;
				}

				// create background map
				if (typeof gameUI == 'undefined') {
					gameUI = new UI(this);
				}

				gameUI.init();
				MapHitArea.init();
				Stage.addChild(gameUI, 'backdrops');

				if (typeof firstRun == 'undefined') {
					gameUI.showWelcome();
					firstRun = false;
				}

			}, //End init
			firstRender: function() {
				// Render the stage first to show the game map before player start the game
				console.log("first render is called");
				stage.render();
			},
			// Start game loop
			start: function() {
				this.reset();
				lastTime = Date.now();
				_intervalId = setInterval(function() {
					Game.updateHSI();
				}, 500);
				this.loop();
			},
			reset: function() {
				var that = this;
				this.hsi = new HSI(Config.HSI.init);
				console.log(this.hsi);
				this.hsi.on.negativeHSI.add(function(){Game.gameOver.call(that);});
				this.cash = 0;
				this.gameTime = 0;
				lastTime = 0;
				this.powerQuota = this.powerUsed = 0;
				gameUI.setHsiDisplayValue(this.hsi.getHSI());
				gameUI.setPowerBar(0, 0);
				level = 1;
				this.enemyCounter= 0;
				this.minAmountOfEnemy = Config.enemy.intiMinAmount;
				this.maxAmountOfEnemy = Config.enemy.intiMaxAmount;
				this.on.reset.dispatch();
				this.spawnTimer = Config.enemy.initDelay


				Built = {
					numberOfUniversity: 0,
					numberOfResearchCenter: 0,
					numberOfCheungKongLimited: 0,
				};


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

				gameUI.setPowerBar(this.powerQuota - this.powerUsed, this.powerQuota);
				var that = this;
				frameId = requestAnimationFrame(function(){Game.loop.call(that)});
			},
			gameOver:function(){
				cancelAnimationFrame(frameId);
				clearInterval(_intervalId);
				for (var i = earthquakeTimer.length - 1; i >= 0; i--) {
					clearTimeout(earthquakeTimer[i]);
				};
				gameUI.showGameOver();
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
			tick: function(dt) {
				this.updateEntities(dt);


				this.gameTime += dt;

				if (this.gameTime > this.spawnTimer) {
					// if spawned enough typhoons
					if (this.enemyCounter >= this.maxAmountOfEnemy) {
						console.log("(" + this.gameTime + ")Earthquake phase " + this.level);
						//random time launch a eathquake in each level
						var that = this;
						console.log("Spawning " + this.minAmountOfEnemy + " earthquakes: " );

						for (var i = this.minAmountOfEnemy - 1; i >= 0; i--) {
							var spawnTimeout = setTimeout(function() {
								that.spawnEarthquake(dt);
							}, Math.random() * 500);
							earthquakeTimer.push(spawnTimeout);
						};
						this.maxAmountOfEnemy += this.minAmountOfEnemy;
						this.minAmountOfEnemy += 1;
						this.level += 1;
						//this.gameTime = Config.enemy.initDelay;
						this.enemyCounter = 0;
					}else{
						console.log("(" + this.gameTime + ")Typhoon phase " + this.level);
						/*
						 *	Create Enemies with time increasing
						 *	- It gets harder over time by adding enemies using this
						 *	- orginial equation: 1-.993^gameTime
						 *
						 */
						var amountOfEnemy = Math.floor( Math.random() * (this.maxAmountOfEnemy - this.minAmountOfEnemy) ) + this.minAmountOfEnemy;
						if(amountOfEnemy > this.maxAmountOfEnemy - this.enemyCounter){
							amountOfEnemy = this.maxAmountOfEnemy - this.enemyCounter;
						}
						console.log("Spawning " + amountOfEnemy + "/" + this.maxAmountOfEnemy + " enemies: " );
						var that = this;
						var nextEnemyTime = 0;
						for (var i = amountOfEnemy - 1; i >= 0; i -= 1) {
							var spawnTimeout = setTimeout(function() {
								console.log("@ " + that.gameTime + " spawn");
								that.spawnTyphoon(dt);
							}, nextEnemyTime);
							earthquakeTimer.push(spawnTimeout);
							nextEnemyTime += Math.random() * 700;
							// count enemies
							this.enemyCounter += 1;
						}; //End for
						//console.log("enemy counter: "+ this.enemyCounter);

					}//End if
					var nextTimeIn = Config.enemy.nextWaveWaitTimeFunction(this.gameTime);
					this.spawnTimer += nextTimeIn
					console.log("Next wave in: " + nextTimeIn);
				} //End if

			}, //End tick()
			updateEntities: function(dt) {
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
			updateHSI: function() {
				//check any typhoon within the circle
				//TODO could be optimize
				//
				var hsiChange = (Config.HSI.increment + Math.round(Math.random() * Config.HSI.upperOfRandom) + Math.round(Math.random() * Config.HSI.lowerOfRandom));
				if (this.built.cheungKongLimited)
					hsiChange *= Config.CheungKong.hsiIncrementMultiplier;
				for (var i = Stage.displayList['typhoons'].length - 1; i >= 0; i--) {
					var e = Stage.displayList['typhoons'][i];
					// skip if typhoon is destroyed
					if(e===undefined){
						continue;
					}

					// check distance
					var distance = Utility.pointDistance(Config.hkArea.x, Config.hkArea.y, e.x, e.y);
					if (distance <= Config.hkArea.effectAreaRadius) {

						// vary damage according to distance
						hsiChange = -1* Math.round((Config.enemy.damage * (Config.hkArea.effectAreaRadius - distance) * 0.1));

						// show amount of HSI deducted
						if(hsiChange != 0){
							new Toast(
								e.x, e.y,
								"HSI " + hsiChange,
								{dir: 270, time: 2, dist: 30},
								{fontSize: "14px", color: "red"}
								);
						}
					}
				} //End for

				this.hsi.addHSI(hsiChange);
				gameUI.setHsiDisplayValue(this.hsi.getHSI());
			},
			addPower: function(p) {
				if (p > 0) {
					this.powerQuota += p;
				} else if (p < 0) {
					this.powerUsed -= p;
				}
				console.log("add: " + p + "= " + this.getAvailablePower());
				// totalPower += p;
			},
			reducePower: function(p) {
				if (p > 0) {
					this.powerQuota -= p;
				} else if (p < 0) {
					this.powerUsed += p;
				}
				console.log("remove: " + p + "= " + this.getAvailablePower());
			},
			getPowerQuota: function(){
				return this.powerQuota;
			},
			getPowerUsed: function(){
				return this.powerUsed;
			},
			getAvailablePower: function() {
				return this.powerQuota - this.powerUsed;
			},
			/**
			 * called by structures to update all towers
			 * when power comes back on
			 * since sStructures cannot see Towers
			 */
			onEnoughPower:function(){
				Tower.all(function(instance){
	            	if(! instance.isOnline()){
		            	var buildToast = new Toast(
		                    instance.x, instance.y - 10,
		                    "Back Online!",
		                    {dir: 270, time: 1.5, dist: 40},
		                    {fontSize: "14px", color: "white"});
	            		instance.isOnline(true);
		            }
	            });
			},
			/**
			 * called by structures to update all towers
			 * when power goes out
			 * since Structures cannot see Towers
			 */
			onOutOfPower: function(){
				var someoneWasOnline = false;
	            Tower.all(function(instance){
	            	if(instance.isOnline()){
		                var buildToast = new Toast(
		                    instance.x, instance.y - 10,
		                    "(Offline)",
		                    {dir: 270, time: 2, dist: 30},
		                    {fontSize: "14px", color: "red"});
		                someoneWasOnline = true;
	            		instance.isOnline(false);
		            }
	            });
	            if(someoneWasOnline){
	            	var buildToast = new Toast(
	                    Stage.width/2, Stage.height - 50,
	                    "Insufficient power. Bulid more power plants to reactivate towers.",
	                    {dir: 90, time: 5, dist: 0},
	                    {fontSize: "20px", color: "#AAAAAA"});
	            }

			},
			getHSI: function(){
				return this.hsi.getHSI();
			},
			affectHSI: function(value) {
				this.hsi.addHSI(value);
			},
			built: function(name) {
				if (name == "University")
					Built.numberOfUniversity++;
				if (name == "ResearchCenter")
					Built.numberOfResearchCenter++;
				if (name == "CheungKongLimited")
					Built.numberOfCheungKongLimited++;
			},
			numberOfBuilding: function(name) {
				if (name == "University")
					return Built.numberOfUniversity;
				if (name == "ResearchCenter")
					return Built.numberOfResearchCenter;
				if (name == "CheungKongLimited")
					return Built.numberOfCheungKongLimited;
			},
			isBuilt: function(name) {
				if (name == "University")
					return (Built.numberOfUniversity>0);
				if (name == "ResearchCenter")
					return (Built.numberOfResearchCenter>0);
				if (name == "CheungKongLimited")
					return (Built.numberOfCheungKongLimited>0);
			},
			destroyBuilding: function(name) {
				if (name == "University")
					Built.numberOfUniversity--;
				if (name == "ResearchCenter")
					Built.numberOfResearchCenter--;
				if (name == "CheungKongLimited")
					Built.numberOfCheungKongLimited--;
			},
			spawnTyphoon: function(dt){
				var xx,
					yy;
				if (Math.random() > 0.5) {
					xx = Stage.width;
					yy = Math.random() * Stage.height;
				} else {
					xx = Math.random() * Stage.width;
					yy = Stage.height;
				} //End if

				// spawn enemy
				// init HP
				var enemyHP = Config.enemy.initHPFunction(Config.enemy.max_hp, this.gameTime);

				// get direction to HK
				var hk_dir = Utility.pointDirection(
					xx, yy,
					Config.hkArea.x, Config.hkArea.y);

				// get init speed and top speed
				var enemySpeed = Config.enemy.initSpeedFunction(Config.enemy.speed, this.gameTime);
				var enemyTopSpeed = Config.enemy.topSpeedFunction(Config.enemy.speed, this.gameTime);
				console.log("new enemy hp speed: \n    " + enemyHP + ", " + enemySpeed);

				// create enemy with hp
				var t = new Enemy(xx, yy, "img/typhoon.png", enemyHP, enemySpeed, enemyTopSpeed);

				// set starting motion
				t.setMotion(hk_dir + Math.random() * 120 - 60, enemySpeed);
			},
			spawnEarthquake:function(dt){
				var targetX = Config.hkArea.x + Math.random() * 600 - 300;
				var targetY = Config.hkArea.y + Math.random() * 600 - 300;
				var earthquake = new Earthquake(targetX, targetY);
			}
		} //End return
	})();

	return Game;
});
