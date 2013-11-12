define(['jquery'], function($) {
	"use strict";

	function UI(stage) {
		this.stage = stage;
		this.ctx = this.stage.getContext();
	}

	UI.prototype = {
		constructor: UI,
		init: function() {
			this.prepareBgImg();
			this.bindBtnEvent();
			this.bindKeyboardEvent();
		},
		prepareBgImg: function() {
			var that = this;
			this.bgImg = new Image();
			this.bgImg.src = "img/map.png";
			this.bgImg.onload = function() {
				that.render();
			}
		},
		bindBtnEvent: function() {
			$('#control-bar button').click(function(e) {
				// Should be a switch here
				alert(e.target.id);
			})
		},
		bindKeyboardEvent: function() {
			$(document).keyup(function(e) {
				// Should be a switch here
				console.log('keycode = ' + e.which);
			});
		},
		render: function() {
			this.ctx.drawImage(this.bgImg, 0, 0);
		}
	};

	return UI;
});