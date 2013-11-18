define([
	'jquery',
	'utility',
	'units/attackTower',
	'units/freezeTower'
], function($, Utility,AttackTower,FreezeTower) {
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
			$('#control-bar button').click(function(e) {
				// Should be a switch here
				switch(e.target.id)
				{
					case 'btn-power-plant':
						that.activatedMode = 'attackTower';
						break;
				}
			})
		},
		bindCanvasClickEvent: function() {
			var that = this;
			$('#game-canvas').click(function(event) {
				console.log(that.activatedMode);
				switch (that.activatedMode) {
					case 'attackTower':
						var mousePos = Utility.getMouse(event);
						var tower = new AttackTower(mousePos.x, mousePos.y, "sprite/tower.png");
						break;
					case 'freezeTower':
						var mousePos = Utility.getMouse(event);
						var tower = new FreezeTower(mousePos.x, mousePos.y, "sprite/tower.png");
						break;
				}
				that.activatedMode = null;
			});
		},
		bindKeyboardEvent: function() {
			var that = this;
			$(document).keyup(function(e) {
				// Should be a switch here
				console.log('keycode = ' + e.which);
				switch(e.which)
				{
					case 81:
						that.activatedMode = 'attackTower';
						break;
					case 87:
						that.activatedMode = 'freezeTower';
						break;
				}
			});
		},
		render: function(ctx) {
			//console.log(this.bgReady);
			if (this.bgReady) {
				ctx.drawImage(this.bgImg, 0, 0);
			}
		}
	};

	return UI;
});