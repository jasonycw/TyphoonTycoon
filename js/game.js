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


	var Game = (function() {
		var that = this;
		var intervalId = null;
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
			powerQuota: 0,
			powerUsed: 0,
			hsi: 0,
			cash: 0,
			level: 1,
			enemyCounter: 0,
			minAmongOfEnemy: 0,
			maxAmongOfEnemy: 0,

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
					gameUI = new UI();
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
				stage.render();
			},
			// Start game loop
			start: function() {
				this.reset();
				lastTime = Date.now();

				intervalId = setInterval(function() {
					Game.updateHSI();
				}, 100);
				this.loop();
			},
			reset: function() {
				hsi = Config.HSI.init;
				cash = 0;
				gameTime = 0;
				lastTime = 0;
				powerQuota = powerUsed = 0;
				gameUI.setHsiDisplayValue(hsi);
				gameUI.setPowerBar(0, 0);
				level: 1;
				enemyCounter= 0;
				minAmongOfEnemy = Config.enemy.intiMinAmong;
				maxAmongOfEnemy = Config.enemy.intiMaxAmong;


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

				gameUI.setPowerBar(powerQuota - powerUsed, powerQuota);
				if (hsi <= 0) {
					cancelAnimationFrame(frameId);
					clearInterval(intervalId);
					for (var i = earthquakeTimer.length - 1; i >= 0; i--) {
						clearTimeout(earthquakeTimer[i]);
					};
					gameUI.showGameOver();

				} else {
					frameId = requestAnimationFrame(Game.loop);
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
			tick: function(dt) {
				this.updateEntities(dt);

				if (dt < 1) { // fix bug coused by lag
					gameTime += dt;
				}

				if (gameTime > Config.enemy.initDelay) {
					//reset and next level 
					if (this.enemyCounter >= maxAmongOfEnemy) {
						maxAmongOfEnemy += (minAmongOfEnemy * 2);
						minAmongOfEnemy += 1;
						this.level += 1;
						gameTime = Config.enemy.initDelay;
						this.enemyCounter = 0;

						//random time launch a eathquake in each level
						for (var i = minAmongOfEnemy - 1; i >= 0; i--) {
							earthquakeTimer.push(setTimeout(function() {
								var targetX = Config.hkArea.x + Math.random() * 600 - 300;
								var targetY = Config.hkArea.y + Math.random() * 600 - 300;
								var earthquake = new Earthquake(targetX, targetY);
							}, Math.random * 60000));

						};
					}
					/*
						Create Enemies with time increasing
						- It gets harder over time by adding enemies using this
						- orginial equation: 1-.993^gameTime
						
					 */
					if (Math.random() < 1 - Math.pow(.993, gameTime / Config.enemy.difficulty)) {

						for (var i = minAmongOfEnemy - 1; i >= 0; i -= 1) {
							var t,
								xx,
								yy;
							if (Math.random() > 0.5) {
								xx = Stage.width;
								yy = Math.random() * Stage.height;
							} else {
								xx = Math.random() * Stage.width;
								yy = Stage.height;
							} //End if

							//TODO: change different kind of enemies
							t = new Enemy(xx, yy, "img/typhoon.png");
							var hk_dir = Utility.pointDirection(
								xx, yy,
								Config.hkArea.x, Config.hkArea.y);
							t.setMotion(hk_dir + Math.random() * 120 - 60, Math.random() * this.level + 1 + 0.5);
							this.enemyCounter += 1;
						}; //End for

					} //End if


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

				var penalty = 0;
				//check any typhoon within the circle
				//TODO could be optimize
				//
				that = this;
				var hsiChange = (Config.HSI.increment + Math.round(Math.random() * Config.HSI.upperOfRandom) + Math.round(Math.random() * Config.HSI.lowerOfRandom));
				if (that.built.cheungKongLimited)
					hsiChange *= Config.cheungKong.hsiIncrementMultiplier;
				for (var i = Stage.displayList['typhoons'].length - 1; i >= 0; i--) {
					var e = Stage.displayList['typhoons'][i];
					var distance;
					try {
						distance = Utility.pointDistance(Config.hkArea.x, Config.hkArea.y, e.x, e.y);
					} catch (err) {} finally {
						if (!isNaN(distance) && e != null) {
							if (distance <= Config.hkArea.effectAreaRadius) {
								hsiChange = -(Config.enemy.damage * Math.round((Config.hkArea.effectAreaRadius - Math.round(distance)) * 0.1));
							}
						} //End if
					} //End try..finally
				} //End for
				this.affectHSI(hsiChange);
				gameUI.setHsiDisplayValue(hsi);
			},
			addPower: function(p) {
				if (p > 0) {
					powerQuota += p;
				} else if (p < 0) {
					powerUsed -= p;
				}
				// totalPower += p;
			},
			reducePower: function(p) {
				powerQuota -= p;
			},
			getAvailablePower: function() {
				return powerQuota - powerUsed;
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
				if (name == "University")
					Built.numberOfUniversity++;
				if (name == "ResearchCenter")
					Built.numberOfResearchCenter++;
				if (name == "CheungKongLimited")
					Built.numberOfCheungKongLimited++;
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
			}
		} //End return
	})();

	return Game;
});