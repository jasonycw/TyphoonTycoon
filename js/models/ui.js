define(["easel"], function(easel) {
	var stage;

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
				var mapBackground = new createjs.Bitmap(bgImg);
				that.stage.addChildAt(mapBackground, 0); // always at the back
				that.stage.update();
			}
		}
	};

	return UI;
});