define([
	'jquery',
	'underscore',
	'models/MapHitArea',
	'utility',
	'stage',
	'config',
	'units/attackTower',
	'units/freezeTower',
	'units/reflectTower',
	'units/powerPlant',
	'units/nuclearPlant',
	'units/university',
	'units/researchCenter',
	'units/cheungKong',
	'models/hkCircle',
	'sound'
], function($, _, MapHitArea, Utility, Stage, Config, AttackTower, FreezeTower, ReflectTower, PowerPlant, NuclearPlant, University, ResearchCenter, CheungKong, HKCircle, Sound) {

	"use strict";

	function UI(game) {
		this.game = game;
		this.bgReady = false;
		this.activatedMode = null;
		this.lowPowerAlerted = false;
	}

	UI.prototype = {
		constructor: UI,
		init: function() {
			this.queryDOM();
			this.prepareBgImg();
			this.bindBtnEvent();
			this.bindKeyboardEvent();
			this.bindCanvasClickEvent();
			this.bindCanvasMouseMoveEvent();
			this.showButtonTooltip();

			this.drawHKCircle();

			// Load game hit area
			MapHitArea.init();

			// Sound Effect
			this.buildSound = new Sound('buildSound');
		},
		showButtonTooltip: function() {
			var btnIds = ['btn-power-plant', 'btn-laser-tower', 'btn-freeze-tower', 'btn-repel-tower', 'btn-nuclear-plant', 'btn-university', 'btn-research-center', 'btn-cheung-kong'];
			var configIds = ['powerPlant', 'attackTower', 'freezeTower', 'repelTower', 'nuclearPlant', 'university', 'researchCenter', 'cheungKong'];
			var titles = [
				'Power Plant',
				'Laser Tower',
				'Freeze Tower',
				'Repel Tower',
				'Nuclear Power Plant',
				'University',
				'Research Center',
				'Cheung Kong (Holdings) Limited'
			];
			var description = [
				'Simple power plant.',
				'Shoot laser beam.',
				'Slow down the time',
				'Repel everything.',
				'Strong nuclear plant.',
				'Upgrade for Laser Tower and unlock Freeze Tower.',
				'Upgrade for Laser and Freeze Tower and unlock Repel Tower.',
				'Earn double and upgrade Repel Tower.'
			];
			$('#btn-bar button').hover(function(e) {
				var left = e.pageX;
        		var top = e.pageY + 16;
				var idx = _.indexOf(btnIds, e.target.id);
				$('#tooltip')
					.html('<strong>' + titles[idx] + '</strong><br /><em>' 
						+ description[idx] + '</em><br />Cost: ' 
						+ Config[configIds[idx]].cost + '<br />Power: '
						+ Config[configIds[idx]].power)
					.css('top', top).css('left', left).show();
			}, function(e) {
				$('#tooltip').hide();
			});
		},
		drawHKCircle: function() {
			this.hkCircle = new HKCircle();
		},
		prepareBgImg: function() {
			this.bgImg = new Image();
			this.bgImg.src = "img/map.png";

			var that = this;
			this.bgImg.onload = function() {
				that.bgReady = true;
				that.game.firstRender();
			}
		},
		findNearestBuilding: function(x, y) {
			var nearestBuilding = null;
			var nearestDist = 10000000;
			var tempBuilding // reused variable
			var dist; // reused variable
			_.each(Stage.displayList['towers'], function(tempBuilding) {
				dist = Utility.pointDistance(x, y, tempBuilding.x, tempBuilding.y);
				if (dist < nearestDist) {
					nearestBuilding = tempBuilding;
					nearestDist = dist;
				}
			});

			if (typeof nearestBuilding === 'object')
				return {
					targetBuilding: nearestBuilding,
					distance: nearestDist
				};
			else
				return null;
		},
		bindCanvasMouseMoveEvent: function() {
			var that = this;
			this.$canvas.mousemove(function(e) {
				if (!that.activatedMode) {
					that.$canvas.css('cursor', 'default');
					return;
				}
				var mousePos = Utility.getMouse(e);
				var nearestBuilding = that.findNearestBuilding(mousePos.x, mousePos.y);
				if (nearestBuilding && nearestBuilding.distance >= Config.nearestBuildingDistance && that.canBuildOnLand(that.activatedMode) == MapHitArea.isLand(mousePos.x, mousePos.y)) {
					that.$canvas.css('cursor', 'default');
				} else {
					that.$canvas.css('cursor', 'not-allowed');
				}
			});
		},
		queryDOM: function() {
			this.$hsi = $('#hsi');
			this.$powerTitle = $('#power-title');
			this.$powerBar = $('#power-bar');
			this.$canvas = $('#game-canvas');
		},
		setButtonState: function() {
			if (this.activatedMode !== null) {
				return;
			}
			if (this.game.getHSI() >= Config.attackTower.cost+Config.university.attackTowerCostIncrease*this.game.numberOfBuilding('University')+Config.researchCenter.attackTowerCostIncrease*this.game.numberOfBuilding('ResearchCenter')) {
				$('#btn-laser-tower').attr('disabled', false);
			} else {
				$('#btn-laser-tower').attr('disabled', true);
			}

			if (this.game.getHSI() >= Config.freezeTower.cost+Config.researchCenter.freezeTowerCostIncrease*this.game.numberOfBuilding('ResearchCenter') && this.game.isBuilt('University')) {
				$('#btn-freeze-tower').attr('disabled', false);
			} else {
				$('#btn-freeze-tower').attr('disabled', true);
			}

			if (this.game.getHSI() >= Config.repelTower.cost-Config.cheungKong.repelTowerCostDecrease*this.game.numberOfBuilding('CheungKongLimited') && this.game.isBuilt('ResearchCenter')) {
				$('#btn-repel-tower').attr('disabled', false);
			} else {
				$('#btn-repel-tower').attr('disabled', true);
			}

			if (this.game.getHSI() >= Config.powerPlant.cost) {
				$('#btn-power-plant').attr('disabled', false);
			} else {
				$('#btn-power-plant').attr('disabled', true);
			}

			if (this.game.getHSI() >= Config.nuclearPlant.cost && this.game.isBuilt('ResearchCenter')) {
				$('#btn-nuclear-plant').attr('disabled', false);
			} else {
				$('#btn-nuclear-plant').attr('disabled', true);
			}

			if (this.game.getHSI() >= Config.university.cost) {
				$('#btn-university').attr('disabled', false);
			} else {
				$('#btn-university').attr('disabled', true);
			}

			if (this.game.getHSI() >= Config.researchCenter.cost && this.game.isBuilt('University')) {
				$('#btn-research-center').attr('disabled', false);
			} else {
				$('#btn-research-center').attr('disabled', true);
			}

			if (this.game.getHSI() >= Config.cheungKong.cost && this.game.isBuilt('ResearchCenter')) {
				$('#btn-cheung-kong').attr('disabled', false);
			} else {
				$('#btn-cheung-kong').attr('disabled', true);
			}

		},
		bindBtnEvent: function() {
			var that = this;
			$('#btn-bar button').click(function(e) {
				// Should be a switch here
				switch (e.target.id) {
					case 'btn-laser-tower':
						that.activatedMode = 'attackTower';
						break;
					case 'btn-freeze-tower':
						if (that.game.isBuilt('University'))
							that.activatedMode = 'freezeTower';
						break;
					case 'btn-repel-tower':
						if (that.game.isBuilt('ResearchCenter'))
							that.activatedMode = 'reflectTower';
						break;
					case 'btn-power-plant':
						that.activatedMode = 'powerPlant';
						break;
					case 'btn-nuclear-plant':
						if (that.game.isBuilt('ResearchCenter'))
							that.activatedMode = 'nuclearPlant';
						break;
					case 'btn-university':
						that.activatedMode = 'university';
						break;
					case 'btn-research-center':
						if (that.game.isBuilt('University'))
							that.activatedMode = 'researchCenter';
						break;
					case 'btn-cheung-kong':
						if (that.game.isBuilt('ResearchCenter'))
							that.activatedMode = 'cheungKong';
						break;
				}
				if (that.activatedMode !== null) {
					$('#btn-bar button').removeAttr('data-activated');
					$(e.target).attr('disabled', false).attr('data-activated', 'activated');
				}
			})
		},
		// Check the tower can be build on land
		canBuildOnLand: function(tower) {
			switch (tower) {
				case 'attackTower':
					return false;
				case 'freezeTower':
					return false;
				case 'reflectTower':
					return false;
				case 'powerPlant':
					return true;
				case 'nuclearPlant':
					return true;
				case 'university':
					return true;
				case 'researchCenter':
					return true;
				case 'cheungKong':
					return true;
			}
		},
		bindCanvasClickEvent: function() {
			var that = this;
			$('#game-canvas').click(function(event) {
				var mousePos = Utility.getMouse(event);
				var nearestBuilding = that.findNearestBuilding(mousePos.x, mousePos.y);
				if (nearestBuilding) {
					if (that.findNearestBuilding(mousePos.x, mousePos.y).distance >= Config.nearestBuildingDistance)
						switch (that.activatedMode) {
							case 'attackTower':
								// Can only build on ocean
								if (!MapHitArea.isLand(mousePos.x, mousePos.y) && that.game.getHSI() >= Config.attackTower.cost) {
									var tower = new AttackTower(that.game, mousePos.x, mousePos.y, "img/sprite/laser-tower.png");
									var cost = Config.attackTower.cost;
									if (that.game.isBuilt('University'))
										cost += Config.university.attackTowerCostIncrease*that.game.numberOfBuilding('University');
									if (that.game.isBuilt('ResearchCenter'))
										cost += Config.researchCenter.attackTowerCostIncrease*that.game.numberOfBuilding('ResearchCenter');
									that.game.setHSI(that.game.getHSI() - cost);

									if (that.game.getAvailablePower() > 0) {
										that.buildSound.play('plot');
									} else {
										that.buildSound.play('outOfPower');
									}
								} else {
									that.buildSound.play('disabled');
								}
								break;
							case 'freezeTower':
								// Can only build on ocean
								if (!MapHitArea.isLand(mousePos.x, mousePos.y) && that.game.getHSI() >= Config.freezeTower.cost) {
									var tower = new FreezeTower(that.game, mousePos.x, mousePos.y, "img/sprite/freeze-tower.png");

									var cost = Config.freezeTower.cost;
									if (that.game.isBuilt('ResearchCenter'))
										cost += Config.researchCenter.freezeTowerCostIncrease*that.game.numberOfBuilding('ResearchCenter');
									that.game.setHSI(that.game.getHSI() - cost);

									if (that.game.getAvailablePower() > 0) {
										that.buildSound.play('plot');
									} else {
										that.buildSound.play('outOfPower');
									}
								} else {
									that.buildSound.play('disabled');
								}
								break;
							case 'reflectTower':
								// Can only build on ocean
								if (!MapHitArea.isLand(mousePos.x, mousePos.y) && that.game.getHSI() >= Config.repelTower.cost) {
									var tower = new ReflectTower(that.game, mousePos.x, mousePos.y, "img/sprite/repel-tower.png");
									var cost = Config.repelTower.cost;
									if (that.game.isBuilt('CheungKongLimited'))
										cost -= Config.cheungKong.repelTowerCostDecrease*that.game.numberOfBuilding('CheungKongLimited');
									that.game.setHSI(that.game.getHSI() - cost);
									if (that.game.getAvailablePower() > 0) {
										that.buildSound.play('plot');
									} else {
										that.buildSound.play('outOfPower');
									}
								} else {
									that.buildSound.play('disabled');
								}
								break;
							case 'powerPlant':
								if (MapHitArea.isLand(mousePos.x, mousePos.y) && that.game.getHSI() >= Config.powerPlant.cost) {
									var tower = new PowerPlant(that.game, mousePos.x, mousePos.y, "img/sprite/power-plant.png");
									that.buildSound.play('plot');
									that.game.setHSI(that.game.getHSI() - Config.powerPlant.cost);
									if (that.game.getAvailablePower() > 0) {
										that.buildSound.play('plot');
									} else {
										that.buildSound.play('outOfPower');
									}
								} else {
									that.buildSound.play('disabled');
								}
								break;
							case 'nuclearPlant':
								if (MapHitArea.isLand(mousePos.x, mousePos.y) && that.game.getHSI() >= Config.nuclearPlant.cost) {
									var tower = new NuclearPlant(that.game, mousePos.x, mousePos.y, "img/sprite/nuclear.png");
									that.game.setHSI(that.game.getHSI() - Config.nuclearPlant.cost);
									if (that.game.getAvailablePower() > 0) {
										that.buildSound.play('plot');
									} else {
										that.buildSound.play('outOfPower');
									}
								} else {
									that.buildSound.play('disabled');
								}
								break;
							case 'university':
								if (MapHitArea.isLand(mousePos.x, mousePos.y) && that.game.getHSI() >= Config.university.cost) {
									var tower = new University(that.game, mousePos.x, mousePos.y, "img/sprite/university.png");
									that.game.setHSI(that.game.getHSI() - Config.university.cost);

									if (that.game.getAvailablePower() > 0) {
										that.buildSound.play('plot');
									} else {
										that.buildSound.play('outOfPower');
									}
								} else {
									that.buildSound.play('disabled');
								}
								break;
							case 'researchCenter':
								if (MapHitArea.isLand(mousePos.x, mousePos.y) && that.game.getHSI() >= Config.researchCenter.cost) {
									var tower = new ResearchCenter(that.game, mousePos.x, mousePos.y, "img/sprite/research-center.png");
									that.game.setHSI(that.game.getHSI() - Config.researchCenter.cost);
									if (that.game.getAvailablePower() > 0) {
										that.buildSound.play('plot');
									} else {
										that.buildSound.play('outOfPower');
									}
								} else {
									that.buildSound.play('disabled');
								}
								break;
							case 'cheungKong':
								if (MapHitArea.isLand(mousePos.x, mousePos.y) && that.game.getHSI() >= Config.cheungKong.cost) {
									var tower = new CheungKong(that.game, mousePos.x, mousePos.y, "img/sprite/ckh.png");

									that.buildSound.play('plot');
									that.game.setHSI(that.game.getHSI() - Config.cheungKong.cost);
									if (that.game.getAvailablePower() > 0) {
										that.buildSound.play('plot');
									} else {
										that.buildSound.play('outOfPower');
									}
								} else {
									that.buildSound.play('disabled');
								}
								break;
						}
				}
				that.activatedMode = null;
				that.setButtonState();
				$('#btn-bar button').removeAttr('data-activated');
			});
		},
		bindKeyboardEvent: function() {
			var that = this;
			$(document).keyup(function(e) {
				// Esc or Space bar
				if (e.which === 27 || e.which === 32) {
					$('#btn-bar button').removeAttr('data-activated');
					that.activatedMode = null;
					that.setButtonState();
					return;
				}
				var btnId;
				switch (e.which) {
					case 49:
						// 1
						if (that.game.getHSI() >= Config.powerPlant.cost) {
							that.activatedMode = 'powerPlant';
							btnId = 'btn-power-plant';
						} else {
							that.activatedMode = null;
							btnId = null;
						}
						break;
					case 50:
						// 2
						if (that.game.getHSI() >= Config.attackTower.cost+Config.university.attackTowerCostIncrease*that.game.numberOfBuilding('University')+Config.researchCenter.attackTowerCostIncrease*that.game.numberOfBuilding('ResearchCenter')) {
							that.activatedMode = 'attackTower';
							btnId = 'btn-laser-tower';
						} else {
							that.activatedMode = null;
							btnId = null;
						}
						break;
					case 51:
						// 3
						if (that.game.getHSI() >= Config.freezeTower.cost+Config.researchCenter.freezeTowerCostIncrease*that.game.numberOfBuilding('ResearchCenter') && that.game.isBuilt('University')) {
							that.activatedMode = 'freezeTower';
							btnId = 'btn-freeze-tower';
						} else {
							that.activatedMode = null;
							btnId = null;
						}
						break;
					case 52:
						// 4
						if (that.game.getHSI() >= Config.repelTower.cost-Config.cheungKong.repelTowerCostDecrease*that.game.numberOfBuilding('CheungKongLimited') && that.game.isBuilt('ResearchCenter')) {
							that.activatedMode = 'reflectTower';
							btnId = 'btn-repel-tower';
						} else {
							that.activatedMode = null;
							btnId = null;
						}
						break;
					case 81:
						// Q
						if (that.game.getHSI() >= Config.nuclearPlant.cost && that.game.isBuilt('ResearchCenter')) {
							that.activatedMode = 'nuclearPlant';
							btnId = 'btn-nuclear-plant';
						} else {
							that.activatedMode = null;
							btnId = null;
						}
						break;
					case 87:
						// W
						if (that.game.getHSI() >= Config.university.cost) {
							that.activatedMode = 'university';
							btnId = 'btn-university';
						} else {
							that.activatedMode = null;
							btnId = null;
						}
						break;
					case 69:
						// E
						if (that.game.getHSI() >= Config.researchCenter.cost && that.game.isBuilt('University')) {
							that.activatedMode = 'researchCenter';
							btnId = 'btn-research-center';
						} else {
							that.activatedMode = null;
							btnId = null;
						}
						break;
					case 82:
						// R
						if (that.game.getHSI() >= Config.cheungKong.cost && that.game.isBuilt('ResearchCenter')) {
							that.activatedMode = 'cheungKong';
							btnId = 'btn-cheung-kong';
						} else {
							that.activatedMode = null;
							btnId = null;
						}
						break;
					default:
						that.activatedMode = null;
						btnId = null;
				}
				if (that.activatedMode !== null) {
					$('#btn-bar button').removeAttr('data-activated');
					$('#' + btnId).attr('disabled', false).attr('data-activated', 'activated');
				} else {
					$('#btn-bar button').removeAttr('data-activated');
					that.setButtonState();
				}
			});
		},
		render: function(ctx) {
			if (this.bgReady) {
				ctx.drawImage(this.bgImg, 0, 0);
			}
		},
		setHsiDisplayValue: function(index) {
			this.$hsi.html(index);
			this.setButtonState();
		},
		setPowerBar: function(remain, total) {
			var power;
			if (total == 0) {
				power = 0;
			} else {
				power = remain / total * 100;
			}
			this.$powerBar.css('width', power + '%');
			if (power < 0) {
				this.$powerTitle.addClass('title-danger').html('No Power!');
				if (this.lowPowerAlerted == false) {
					this.buildSound.play('outOfPower');
				}
				this.lowPowerAlerted = true;
			} else {
				this.$powerTitle.removeClass('title-danger').html('Power');
				this.lowPowerAlerted = false;
			}
		},
		showWelcome: function() {
			$('#welcome').show();
			var that = this;
			$('#btn-start').click(function() {
				$('#btn-start').unbind('click');
				$('#welcome').hide();
				// Set score
				that.setHsiDisplayValue(Config.initHSI);
				that.setPowerBar(0, 0);
				that.lowPowerAlerted = false;
				that.game.start();
			});
		},
		showGameOver: function() {
			var that = this;
			// Hide tooltip
			$('#tooltip').hide();
			$('#btn-bar button').unbind('hover');

			$('#btn-restart').attr('disabled', false);
			$('#game-over').show();
			this.buildSound.play('gameOver');
			$('#btn-restart').click(function() {
				$('#btn-restart').attr('disabled', true).unbind('click');
				$('#game-over').hide();
				that.game.init();
				that.game.start();
			});
		}
	};

	return UI;
});