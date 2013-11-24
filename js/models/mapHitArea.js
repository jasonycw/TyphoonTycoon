// Detect the coordinates in the map is land or ocean
define([
	'jquery'
],function($) {
	"use strict";

	var MapHitArea = (function() {
		var canvas;
		var ctx;

		function initCanvas() {
			canvas = $('#back-canvas')[0];
			ctx = canvas.getContext && canvas.getContext('2d');
			if (!ctx) {
				throw 'Cannot get the canvas context';
			}
		}

		function initHitAreaImg() {
			var hitareaImg = new Image();
			hitareaImg.crossOrigin = '';	//fix Cross-Origin Resource Sharing policy issue 
											// or store the image as Data URI
			hitareaImg.src = "img/map-hitarea.png";
			hitareaImg.onload = function() {
				ctx.drawImage(hitareaImg, 0, 0);
			}
		}

		return {
			init: function() {
				initCanvas();
				initHitAreaImg();
			},
			isLand: function(x, y) {
				// Check either one color channel is okay as we only have 
				// black (0, 0, 0) and white pixels (255, 255, 255) on canvas
				var red = ctx.getImageData(x, y, 1, 1).data[0];
				if (red == 255) {
					return true;
				} else {
					return false;
				}
			}
		};
	})();

	return MapHitArea;
});