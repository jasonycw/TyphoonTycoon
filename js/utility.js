define([
	'stage'
], function(Stage) {

	console.log("utility.js loaded");

	var Utility = {
		pointDistance: function(x1, y1, x2, y2) {
			return Math.sqrt((y2 - y1) * (y2 - y1) + (x2 - x1) * (x2 - x1));
		},
		pointDirection: function(x1, y1, x2, y2) {
			return Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
		},
		/**
		 *	vectorSum(vectorA,vectorB)
		 *
		 *	@param vectorA object in the form {dir,mag} denoting direction
		 *		and magnitude of the first vector
		 *	@param vectorB same as vectorA
		 */
		vectorSum: function(vA, vB) {
			var ax, ay;
			var bx, by;
			var rx, ry;
			ax = Math.cos(vA.dir / 180 * Math.PI) * vA.mag;
			ay = Math.sin(vA.dir / 180 * Math.PI) * vA.mag;
			bx = Math.cos(vB.dir / 180 * Math.PI) * vB.mag;
			by = Math.sin(vB.dir / 180 * Math.PI) * vB.mag;
			rx = ax + bx;
			ry = ay + by;
			var newDir = Math.atan2(ry, rx) / Math.PI * 180;
			var newMag = Math.sqrt(rx * rx + ry * ry);
			return {
				dir: newDir,
				mag: newMag
			};
		},

		getMouse: function(event) {
			var mx = event.pageX - Stage.getOffsetLeft();
			var my = event.pageY - Stage.getOffsetTop();
			//console.log ("mouse:", mx, my, event.pageX, event.pageY, Stage.offsetLeft, Stage.offsetTop);
			return {
				x: mx,
				y: my
			};
		}

	};

	return Utility;
});