define([
	'jquery',
	'models/MapHitArea',
	'utility',
	'units/attackTower',
	'units/freezeTower',
	'units/reflectTower'
], function($, MapHitArea, Utility, AttackTower, FreezeTower, ReflectTower) {
	"use strict";

	function UI() {
		this.bgReady = false;
		this.activatedMode = null;
	}

	UI.prototype = {
		constructor: UI,
		init: function() {
			this.prepareBgImg();
			this.bindBtnEvent();
			this.bindKeyboardEvent();
			this.bindCanvasClickEvent();
			// Load game hit area
			MapHitArea.init();
		},
		prepareBgImg: function() {
			this.bgImg = new Image();
			this.bgImg.src = "img/map.png";

			var that = this;
			this.bgImg.onload = function() {
				that.bgReady = true;
			}
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
					case 'btn-field-tower':
						that.activatedMode = 'reflectTower';
						break;
				}
				$('#btn-bar button').attr('disabled', true);
				$(e.target).attr('disabled', false).attr('data-activated', 'activated');
			})
		},
		bindCanvasClickEvent: function() {
			var that = this;
			$('#game-canvas').click(function(event) {
				switch (that.activatedMode) {
					case 'attackTower':
						var mousePos = Utility.getMouse(event);
						// Can only build on land
						if (!MapHitArea.isLand(mousePos.x, mousePos.y)) {
							var tower = new AttackTower(mousePos.x, mousePos.y, "img/sprite/laser-tower.png");
						}
						break;
					case 'freezeTower':
						var mousePos = Utility.getMouse(event);
						// Can only build on ocean
						if (!MapHitArea.isLand(mousePos.x, mousePos.y)) {
							var tower = new FreezeTower(mousePos.x, mousePos.y, "img/sprite/freeze-tower.png");
						}
						break;
					case 'reflectTower':
						var mousePos = Utility.getMouse(event);
						// Can only build on ocean
						if (!MapHitArea.isLand(mousePos.x, mousePos.y)) {
							var tower = new ReflectTower(mousePos.x, mousePos.y, "img/sprite/field-tower.png");
						}
						break;
				}
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
				if (that.activatedMode !== null) {
					return;
				}
				var btnId;
				switch (e.which) {
					case 49:
						// 1
						that.activatedMode = 'attackTower';
						btnId = 'btn-laser-tower';
						break;
					case 50:
						// 2
						break;
					case 51:
						// 3
						that.activatedMode = 'freezeTower';
						btnId = 'btn-freeze-tower';
						break;
					case 52:
						// 4
						that.activatedMode = 'reflectTower';
						btnId = 'btn-field-tower';
						break;
					case 81:
						// Q
						break;
					case 87:
						// W
						break;
					case 69:
						// E
						break;
					case 82:
						// R
						break;

				}
				$('#btn-bar button').attr('disabled', true);
				$('#' + btnId).attr('disabled', false).attr('data-activated', 'activated');
			});
		},
		render: function(ctx) {
			if (this.bgReady) {
				ctx.drawImage(this.bgImg, 0, 0);
			}
		}
	};

	return UI;
});