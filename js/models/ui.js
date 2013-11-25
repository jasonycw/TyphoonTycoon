define([
	'jquery',
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
], function($, MapHitArea, Utility, Stage, Config, AttackTower, FreezeTower, ReflectTower, PowerPlant, NuclearPlant, University, ResearchCenter, CheungKong, HKCircle, Sound) {

	"use strict";

	function UI() {
		this.bgReady = false;
		this.activatedMode = null;
		this.HSI;
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
			
			//TODO
			this.drawHKCircle();

			// Load game hit area
			MapHitArea.init();

			// Sound Effect
			this.buildSound = new Sound('buildSound');

			// Set score
			this.setHSI(Config.initHSI);
			this.setPowerBar(0, 0);
			this.lowPowerAlerted = false;

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
			}
		},
		findNearestBuilding: function(x,y) {
			// console.log("1");
			var nearestBuilding=null;
			var nearestDist = 10000000;
			// console.log(nearestDist);
			var tempBuilding	// reused variable
			var dist;			// reused variable
			for(var t in Stage.displayList['towers']){
				
				tempBuilding = Stage.displayList['towers'][t];
				dist = Utility.pointDistance(x,y,tempBuilding.x,tempBuilding.y);
				
				if(dist<nearestDist){
					nearestBuilding = tempBuilding;
					nearestDist = dist;
				}
			}

			if(typeof nearestBuilding === 'object')
				return {targetBuilding:nearestBuilding,distance:nearestDist};
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
		bindBtnEvent: function() {
			var that = this;
			$('#btn-bar button').click(function(e) {
				// Should be a switch here
				switch(e.target.id)
				{
					case 'btn-laser-tower':
						that.activatedMode = 'attackTower';
						break;
					case 'btn-freeze-tower':
						that.activatedMode = 'freezeTower';
						break;
					case 'btn-repel-tower':
						that.activatedMode = 'reflectTower';
						break;
					case 'btn-power-plant':
						that.activatedMode = 'powerPlant';
						break;
					case 'btn-nuclear-plant':
						that.activatedMode = 'nuclearPlant';
						break;
					case 'btn-university':
						that.activatedMode = 'university';
						break;
					case 'btn-research-center':
						that.activatedMode = 'researchCenter';
						break;
					case 'btn-cheung-kong':
						that.activatedMode = 'cheungKong';
						break;
				}
				$('#btn-bar button').attr('disabled', true);
				$(e.target).attr('disabled', false).attr('data-activated', 'activated');
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
				var nearestBuilding = that.findNearestBuilding(mousePos.x,mousePos.y);
				if(nearestBuilding)
				{
					if(that.findNearestBuilding(mousePos.x,mousePos.y).distance >= Config.nearestBuildingDistance)
						switch (that.activatedMode) {
							case 'attackTower':
								// Can only build on ocean
								if (!MapHitArea.isLand(mousePos.x, mousePos.y)) {
									var tower = new AttackTower(mousePos.x, mousePos.y, "img/sprite/laser-tower.png");
									that.buildSound.play('plot');
								} else {
									that.buildSound.play('disabled');
								}
								break;
							case 'freezeTower':
								// Can only build on ocean
								if (!MapHitArea.isLand(mousePos.x, mousePos.y)) {
									var tower = new FreezeTower(mousePos.x, mousePos.y, "img/sprite/freeze-tower.png");
									that.buildSound.play('plot');
								} else {
									that.buildSound.play('disabled');
								}
								break;
							case 'reflectTower':
								// Can only build on ocean
								if (!MapHitArea.isLand(mousePos.x, mousePos.y)) {
									var tower = new ReflectTower(mousePos.x, mousePos.y, "img/sprite/repel-tower.png")
									that.buildSound.play('plot');
								} else {
									that.buildSound.play('disabled');
								}
								break;
							case 'powerPlant':
								if (MapHitArea.isLand(mousePos.x, mousePos.y)) {
									var tower = new PowerPlant(mousePos.x, mousePos.y, "img/sprite/power-plant.png");
									that.buildSound.play('plot');
								} else {
									that.buildSound.play('disabled');
								}
								break;
							case 'nuclearPlant':
								if (MapHitArea.isLand(mousePos.x, mousePos.y)) {
									var tower = new NuclearPlant(mousePos.x, mousePos.y, "img/sprite/nuclear.png");
									that.buildSound.play('plot');
								} else {
									that.buildSound.play('disabled');
								}
								break;
							case 'university':
								if (MapHitArea.isLand(mousePos.x, mousePos.y)) {
									var tower = new University(mousePos.x, mousePos.y, "img/sprite/university.png");
									that.buildSound.play('plot');
								} else {
									that.buildSound.play('disabled');
								}
								break;
							case 'researchCenter':
								if (MapHitArea.isLand(mousePos.x, mousePos.y)) {
									var tower = new ResearchCenter(mousePos.x, mousePos.y, "img/sprite/research-center.png");
									that.buildSound.play('plot');
								} else {
									that.buildSound.play('disabled');
								}
								break;
							case 'cheungKong':
								if (MapHitArea.isLand(mousePos.x, mousePos.y)) {
									var tower = new CheungKong(mousePos.x, mousePos.y, "img/sprite/ckh.png");
									that.buildSound.play('plot');
								} else {
									that.buildSound.play('disabled');
								}
								break;
						}
				}
				$('#btn-bar button').attr('disabled', false).removeAttr('data-activated');
				that.activatedMode = null;
			});
		},
		bindKeyboardEvent: function() {
			var that = this;
			$(document).keyup(function(e) {
				//console.log(e.which);

				// Esc or Space bar
				if (e.which === 27 || e.which === 32) {
					$('#btn-bar button').attr('disabled', false).removeAttr('data-activated');
					that.activatedMode = null;
					return;
				}
				// if (that.activatedMode !== null) {
				// 	return;
				// }
				var btnId;
				switch (e.which) {
					case 49:
						// 1
						that.activatedMode = 'powerPlant';
						btnId = 'btn-power-plant';
						break;
					case 50:
						// 2
						that.activatedMode = 'attackTower';
						btnId = 'btn-laser-tower';
						break;
					case 51:
						// 3
						that.activatedMode = 'freezeTower';
						btnId = 'btn-freeze-tower';
						break;
					case 52:
						// 4
						that.activatedMode = 'reflectTower';
						btnId = 'btn-repel-tower';
						break;
					case 81:
						// Q
						that.activatedMode = 'nuclearPlant';
						btnId = 'btn-nuclear-plant';
						break;
					case 87:
						// W
						that.activatedMode = 'university';
						btnId = 'btn-university';
						break;
					case 69:
						// E
						that.activatedMode = 'researchCenter';
						btnId = 'btn-research-center';
						break;
					case 82:
						// R
						that.activatedMode = 'cheungKong';
						btnId = 'btn-cheung-kong';
						break;
				}
				if(that.activatedMode!==null)
				{
					$('#btn-bar button').attr('disabled', true);
					$('#' + btnId).attr('disabled', false).attr('data-activated', 'activated');
				}
			});
		},
		render: function(ctx) {
			if (this.bgReady) {
				ctx.drawImage(this.bgImg, 0, 0);
			}
		},
		setHSI: function(index) {
			this.$hsi.html(index);
			this.HSI = index;
		},
		getHSI: function() {
			return	this.HSI;
		},
		setPowerBar: function(remain, total) {
			var power;
			if (total == 0) {
				power = 0;
			} else {
				power = remain / total * 100;
			}
			this.$powerBar.css('width', power + '%');
			if (power <= 0) {
				this.$powerTitle.addClass('title-danger').html('No Power!');
				if (this.lowPowerAlerted == false) {
					this.buildSound.play('outOfPower');
				}
				this.lowPowerAlerted = true;
			} else {
				this.$powerTitle.removeClass('title-danger').html('Power');
				this.lowPowerAlerted = false;
			}
		}
	};

	return UI;
});