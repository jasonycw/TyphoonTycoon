define([], function() {
	"use strict";
	var ctx;

	function UI(ctx) {
		this.ctx = ctx;
	}

	UI.prototype = {
		init: function() {
			this.prepareBgImg();
		},
		prepareBgImg: function() {
			var that = this;
			var bgImg = new Image();
			bgImg.src = "img/map.png";
			bgImg.onload = function() {
				that.ctx.drawImage(bgImg, 0, 0);
			}
		}
	};

	return UI;
});