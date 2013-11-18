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
				}
				$('#btn-bar button').attr('disabled', true);
				$(e.target).attr('disabled', false).attr('data-activated', 'activated');
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
				$('#btn-bar button').attr('disabled', false).removeAttr('data-activated');
				that.activatedMode = null;
			});
		},
		bindKeyboardEvent: function() {
			var that = this;
			$(document).keyup(function(e) {
				console.log(e.which);
				// Esc
				if (e.which === 27) {
					$('#btn-bar button').attr('disabled', false).removeAttr('data-activated');
					that.activatedMode = null;
					return;
				}
				if (that.activatedMode !== null) {
					return;
				}
				var btnId;
				switch (e.which) {
					case 81:
						// Q
						that.activatedMode = 'attackTower';
						btnId = 'btn-laser-tower';
						break;
					case 69:
						// E
						that.activatedMode = 'freezeTower';
						btnId = 'btn-freeze-tower';
						break;
				}
				$('#btn-bar button').attr('disabled', true);
				$('#' + btnId).attr('disabled', false).attr('data-activated', 'activated');
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