define(["easel"], function(easel) {
	"use strict";
	var stage;

	var mapBg;

	function UI(s) {
		this.stage = s;
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
				that.mapBg = new createjs.Bitmap(bgImg);
				that.stage.addChildAt(that.mapBg, 0); // always at the back
				that.stage.update();
			}
		}
	};

	return UI;
});