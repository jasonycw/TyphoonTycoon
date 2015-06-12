define([
	'jquery',
	'underscore',
	'models/mapHitArea',
	'utility',
	'stage',
	'config',
	'units/structure',
	'units/attackTower',
	'units/freezeTower',
	'units/reflectTower',
	'units/powerPlant',
	'units/nuclearPlant',
	'units/university',
	'units/researchCenter',
	'units/cheungKong',
	'models/hkCircle',
	'sound',
	'models/toast',
	'models/signals/sigGameReset',
	'models/signals/sigGameOver'
], function($, _, MapHitArea, Utility, Stage, Config, Structure, AttackTower, FreezeTower, ReflectTower, PowerPlant, NuclearPlant, University, ResearchCenter, CheungKong, HKCircle, Sound, Toast, SigGameReset, SigGameOver) {

	"use strict";

	function UI(game) {
		this.game = game;
		this.bgReady = false;
		this.activatedMode = null;
		this.lowPowerAlerted = false;
	}

	UI.prototype = {
		constructor: UI,
		on:{
			reset: SigGameReset.get(),
			gameover: SigGameOver.get()
		},
		structureClassMap:{
			"AttackTower":AttackTower,
			"FreezeTower":FreezeTower,
			"ReflectTower":ReflectTower,
			"PowerPlant":PowerPlant,
			"NuclearPlant":NuclearPlant,
			"University":University,
			"ResearchCenter":ResearchCenter,
			"CheungKong":CheungKong,
		},
		init: function() {
			this.queryDOM();
			this.prepareBgImg();
			this.bindBtnEvent();
			this.bindKeyboardEvent();
			this.bindCanvasClickEvent();
			this.bindCanvasMouseMoveEvent();
			this.bindButtonTooltip();

			var that = this;
			this.on.reset.add(function(){
				that.startBGM();
			});
			this.on.gameover.add(function(){
				that.showGameOver();
			});

			this.drawHKCircle();

			// Load game hit area
			MapHitArea.init();

			// Sound Effect
			this.buildSound = new Sound('buildSound');
		},
		startBGM: function(){
			console.log("Go! BGM!");
			var bgm = this.$bgm.get()[0];
			bgm.play();
		},
		stopAndRewindBGM: function(){
			var bgm = this.$bgm.get()[0];
			bgm.pause(); 
			bgm.currentTime = 0;
		},
		bindButtonTooltip: function() {
			var btnIds = ['btn-power-plant', 'btn-laser-tower', 'btn-freeze-tower', 'btn-repel-tower', 'btn-nuclear-plant', 'btn-university', 'btn-research-center', 'btn-cheung-kong'];
			var configIds = ['PowerPlant', 'AttackTower', 'FreezeTower', 'RepelTower', 'NuclearPlant', 'University', 'ResearchCenter', 'CheungKong'];

			$('#btn-bar button').append("<div class='hover-catcher'></div>");
			var that = this;
			$('#btn-bar .hover-catcher').hover(function(e) {
				// mouse location
				var left = e.pageX;
        		var top = e.pageY + 16;

        		// id to array index
				var idx = _.indexOf(btnIds, e.target.parentNode.id);

				// text content of power
				var powerHTML = (Config[configIds[idx]].power>0?"+":"") +
					Config[configIds[idx]].power;

				// turn red if going to run out of power
				if(that.game.getAvailablePower()< (0-Config[configIds[idx]].power) ){
					powerHTML = "<span class='low-power'>" + "(" + powerHTML +")" + "</span>";
				}

				var description = ''+
					'<strong>' + Config[configIds[idx]].title + '</strong><br />' +
					'<em>' + Config[configIds[idx]].description + '</em><br />' +
					'Cost: ' + Config[configIds[idx]].cost + '<br />' +
					'Power: ' + powerHTML + '<br />' +
					'Built on: '+ Config[configIds[idx]].builtOn + '<br />' +
					'Req: ' + Config[configIds[idx]].req;
				$('#tooltip')
					.html(description)
					.css('top', top)
					.css('left', left)
					.show();
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
			_.each(Stage.displayList['structures'], function(tempBuilding) {
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
		// Check the tower can be build on land
		canBuildOnLand: function(tower) {
			return Config[tower].builtOn == "Land";
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
			this.$bgm = $('#bgm');
		},
		setButtonState: function() {
			if (this.activatedMode !== null) {
				return;
			}
			if (this.game.getHSI() >= Config.AttackTower.cost+Config.University.attackTowerCostIncrease*this.game.numberOfBuilding('University')+Config.ResearchCenter.attackTowerCostIncrease*this.game.numberOfBuilding('ResearchCenter')) {
				$('#btn-laser-tower').attr('disabled', false);
			} else {
				$('#btn-laser-tower').attr('disabled', true);
			}

			if (this.game.getHSI() >= Config.FreezeTower.cost+Config.ResearchCenter.freezeTowerCostIncrease*this.game.numberOfBuilding('ResearchCenter') && this.game.isBuilt('University')) {
				$('#btn-freeze-tower').attr('disabled', false);
			} else {
				$('#btn-freeze-tower').attr('disabled', true);
			}

			if (this.game.getHSI() >= Config.RepelTower.cost-Config.CheungKong.repelTowerCostDecrease*this.game.numberOfBuilding('CheungKongLimited') && this.game.isBuilt('ResearchCenter')) {
				$('#btn-repel-tower').attr('disabled', false);
			} else {
				$('#btn-repel-tower').attr('disabled', true);
			}

			if (this.game.getHSI() >= Config.PowerPlant.cost) {
				$('#btn-power-plant').attr('disabled', false);
			} else {
				$('#btn-power-plant').attr('disabled', true);
			}

			if (this.game.getHSI() >= Config.NuclearPlant.cost && this.game.isBuilt('ResearchCenter')) {
				$('#btn-nuclear-plant').attr('disabled', false);
			} else {
				$('#btn-nuclear-plant').attr('disabled', true);
			}

			if (this.game.getHSI() >= Config.University.cost) {
				$('#btn-university').attr('disabled', false);
			} else {
				$('#btn-university').attr('disabled', true);
			}

			if (this.game.getHSI() >= Config.ResearchCenter.cost && this.game.isBuilt('University')) {
				$('#btn-research-center').attr('disabled', false);
			} else {
				$('#btn-research-center').attr('disabled', true);
			}

			if (this.game.getHSI() >= Config.CheungKong.cost && this.game.isBuilt('ResearchCenter')) {
				$('#btn-cheung-kong').attr('disabled', false);
			} else {
				$('#btn-cheung-kong').attr('disabled', true);
			}

		},
		bindBtnEvent: function() {
			var that = this;
			$('#btn-bar button').click(function(e) {
				// Should be a switch here
				switch (e.target.parentNode.id) {
					case 'btn-laser-tower':
						that.activatedMode = 'AttackTower';
						break;
					case 'btn-freeze-tower':
						if (that.game.isBuilt('University'))
							that.activatedMode = 'FreezeTower';
						break;
					case 'btn-repel-tower':
						if (that.game.isBuilt('ResearchCenter'))
							that.activatedMode = 'ReflectTower';
						break;
					case 'btn-power-plant':
						that.activatedMode = 'PowerPlant';
						break;
					case 'btn-nuclear-plant':
						if (that.game.isBuilt('ResearchCenter'))
							that.activatedMode = 'NuclearPlant';
						break;
					case 'btn-university':
						that.activatedMode = 'University';
						break;
					case 'btn-research-center':
						if (that.game.isBuilt('University'))
							that.activatedMode = 'ResearchCenter';
						break;
					case 'btn-cheung-kong':
						if (that.game.isBuilt('ResearchCenter'))
							that.activatedMode = 'CheungKong';
						break;
				}
				if (that.activatedMode !== null) {
					$('#btn-bar button').removeAttr('data-activated');
					$(e.target.parentNode).attr('disabled', false).attr('data-activated', 'activated');
				}
			})
		},
		bindCanvasClickEvent: function() {
			var that = this;
			$('#game-canvas').click(function(event) {
				if(that.activatedMode == null) return;

				var structureClass = that.structureClassMap[that.activatedMode];

				// tech requirement
				var fulfillTechReq = structureClass.fulfillTechReq(that.game);

				// general structure can be built checking
				var mousePos = Utility.getMouse(event);
				var isLand = MapHitArea.isLand(mousePos.x, mousePos.y);
				var cost = structureClass.getCost(game);
				var canBeBuilt = structureClass.canBeBuilt(that.activatedMode, mousePos, isLand, cost, that.game);
				if(canBeBuilt.result){
					// actually build tower
					that.instantiateTower(that.activatedMode, mousePos.x, mousePos.y);

					// pay cost
					that.game.affectHSI(-1 * cost);
					that.buildSound.play('plot');
					// clean up ui
					that.activatedMode = null;
					that.setButtonState();
					$('#btn-bar button').removeAttr('data-activated');
				}else{
					var buildToast = new Toast(
						mousePos.x, mousePos.y - 10,
						canBeBuilt.message,
						{dir: 270, time: 1, dist: 30},
						{fontSize: "14px", color: "silver"});
					that.buildSound.play('disabled');
				}

			});
		},
		instantiateTower: function(towerName, xx, yy){
			switch (towerName) {
				case 'AttackTower':
					var tower = new AttackTower(this.game, xx, yy, "img/sprite/laser-tower.png");
					break;
				case 'FreezeTower':
					// Can only build on ocean
					var tower = new FreezeTower(this.game, xx, yy, "img/sprite/freeze-tower.png");
					break;
				case 'ReflectTower':
					var tower = new ReflectTower(this.game, xx, yy, "img/sprite/repel-tower.png");
					break;
				case 'PowerPlant':
					var tower = new PowerPlant(this.game, xx, yy, "img/sprite/power-plant.png");
					break;
				case 'NuclearPlant':
					var tower = new NuclearPlant(this.game, xx, yy, "img/sprite/nuclear.png");
					break;
				case 'University':
					var tower = new University(this.game, xx, yy, "img/sprite/university.png");
					break;
				case 'ResearchCenter':
					var tower = new ResearchCenter(this.game, xx, yy, "img/sprite/research-center.png");
					break;
				case 'CheungKong':
					var tower = new CheungKong(this.game, xx, yy, "img/sprite/ckh.png");
					break;
			}
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
						if (that.game.getHSI() >= Config.PowerPlant.cost) {
							that.activatedMode = 'PowerPlant';
							btnId = 'btn-power-plant';
						} else {
							that.activatedMode = null;
							btnId = null;
						}
						break;
					case 50:
						// 2
						if (that.game.getHSI() >= Config.AttackTower.cost+Config.University.attackTowerCostIncrease*that.game.numberOfBuilding('University')+Config.ResearchCenter.attackTowerCostIncrease*that.game.numberOfBuilding('ResearchCenter')) {
							that.activatedMode = 'AttackTower';
							btnId = 'btn-laser-tower';
						} else {
							that.activatedMode = null;
							btnId = null;
						}
						break;
					case 51:
						// 3
						if (that.game.getHSI() >= Config.FreezeTower.cost+Config.ResearchCenter.freezeTowerCostIncrease*that.game.numberOfBuilding('ResearchCenter') && that.game.isBuilt('University')) {
							that.activatedMode = 'FreezeTower';
							btnId = 'btn-freeze-tower';
						} else {
							that.activatedMode = null;
							btnId = null;
						}
						break;
					case 52:
						// 4
						if (that.game.getHSI() >= Config.RepelTower.cost-Config.CheungKong.repelTowerCostDecrease*that.game.numberOfBuilding('CheungKongLimited') && that.game.isBuilt('ResearchCenter')) {
							that.activatedMode = 'ReflectTower';
							btnId = 'btn-repel-tower';
						} else {
							that.activatedMode = null;
							btnId = null;
						}
						break;
					case 81:
						// Q
						if (that.game.getHSI() >= Config.NuclearPlant.cost && that.game.isBuilt('ResearchCenter')) {
							that.activatedMode = 'NuclearPlant';
							btnId = 'btn-nuclear-plant';
						} else {
							that.activatedMode = null;
							btnId = null;
						}
						break;
					case 87:
						// W
						if (that.game.getHSI() >= Config.University.cost) {
							that.activatedMode = 'University';
							btnId = 'btn-university';
						} else {
							that.activatedMode = null;
							btnId = null;
						}
						break;
					case 69:
						// E
						if (that.game.getHSI() >= Config.ResearchCenter.cost && that.game.isBuilt('University')) {
							that.activatedMode = 'ResearchCenter';
							btnId = 'btn-research-center';
						} else {
							that.activatedMode = null;
							btnId = null;
						}
						break;
					case 82:
						// R
						if (that.game.getHSI() >= Config.CheungKong.cost && that.game.isBuilt('ResearchCenter')) {
							that.activatedMode = 'CheungKong';
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
				this.$powerTitle
					.removeClass('title-danger')
					.html('Power: ' + remain + " / " + total);
				this.lowPowerAlerted = false;
			}
		},
		showWelcome: function() {
			$('#welcome').show();
			var that = this;
			$('#btn-start').click(function() {
				$('#btn-start').unbind('click');
				$('#welcome').hide();
				that.game.start();
				// Set score
				that.setHsiDisplayValue(Config.initHSI);
				that.setPowerBar(0, 0);
				that.lowPowerAlerted = false;
			});
			$('#tutorial-iframe').bind('click',function() {
				$('#tutorial-iframe').hide();
			});
			$('#btn-tutorial').click(function() {
				$('#tutorial-iframe').show();
			});
		},
		showGameOver: function() {
			var that = this;
			// Hide tooltip
			$('#tooltip').hide();
			$('#btn-bar button').unbind('hover');

			$('#btn-restart').attr('disabled', false);
			$('#game-over').show();
			this.stopAndRewindBGM();
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
