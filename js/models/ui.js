define([
	'jquery',
	'models/MapHitArea',
	'utility',
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
], function($, MapHitArea, Utility, AttackTower, FreezeTower, ReflectTower, PowerPlant, NuclearPlant, University, ResearchCenter, CheungKong, HKCircle, Sound) {

	"use strict";

	function UI() {
		this.bgReady = false;
		this.activatedMode = null;
		this.HSI;
	}

	UI.prototype = {
		constructor: UI,
		init: function() {
			this.prepareBgImg();
			this.bindBtnEvent();
			this.bindKeyboardEvent();
			this.bindCanvasClickEvent();
			this.queryScoreDOM();
			
			//TODO
			this.drawHKCircle();

			// Load game hit area
			MapHitArea.init();

			// Sound Effect
			this.sound = new Sound('sound');

			// Set score
			// this.setHSI(9000);
			// this.setPowerBar(0, 0);

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
		queryScoreDOM: function() {
			this.$hsi = $('#hsi');
			this.$powerBar = $('#power-bar');
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
		bindCanvasClickEvent: function() {
			var that = this;
			$('#game-canvas').click(function(event) {
				var mousePos = Utility.getMouse(event);
				switch (that.activatedMode) {
					case 'attackTower':
					case 'freezeTower':
					case 'reflectTower':
						// Can only build on ocean
						if (MapHitArea.isLand(mousePos.x, mousePos.y)) {
							that.sound.play('disabled');
							return;
						}
						break;
					case 'powerPlant':
					case 'nuclearPlant':
					case 'university':
					case 'researchCenter':
					case 'cheungKong':
						if (!MapHitArea.isLand(mousePos.x, mousePos.y)) {
							that.sound.play('disabled');
							return;
						}
						break;
				}
				switch (that.activatedMode) {
					case 'attackTower':
						var tower = new AttackTower(mousePos.x, mousePos.y, "img/sprite/laser-tower.png");
						break;
					case 'freezeTower':
						var tower = new FreezeTower(mousePos.x, mousePos.y, "img/sprite/freeze-tower.png");
						break;
					case 'reflectTower':
						var tower = new ReflectTower(mousePos.x, mousePos.y, "img/sprite/repel-tower.png");
						break;
					case 'powerPlant':
						var tower = new PowerPlant(mousePos.x, mousePos.y, "img/sprite/power-plant.png");
						break;
					case 'nuclearPlant':
						var tower = new NuclearPlant(mousePos.x, mousePos.y, "img/sprite/nuclear.png");
						break;
					case 'university':
						var tower = new University(mousePos.x, mousePos.y, "img/sprite/university.png");
						break;
					case 'researchCenter':
						var tower = new ResearchCenter(mousePos.x, mousePos.y, "img/sprite/research-center.png");
						break;
					case 'cheungKong':
						var tower = new CheungKong(mousePos.x, mousePos.y, "img/sprite/ckh.png");
						break;
				}
				that.sound.play('plot');
				$('#btn-bar button').attr('disabled', false).removeAttr('data-activated');
				that.activatedMode = null;
			});
		},
		bindKeyboardEvent: function() {
			var that = this;
			$(document).keyup(function(e) {
				//console.log(e.which);

				// Esc
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
					default:
						return;
						// that.activatedMode = null;
						// btnId = null;
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
		}
	};

	return UI;
});