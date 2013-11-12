define([
	'jquery',
	'underscore'
], function($, _) {

	console.log("utility.js loaded");

	var Utility = {
		// Just an example, remove it when you create a new method.
		test: function() {
			return true;
		},
		point_distance:function(x1,y1,x2,y2){
			return Math.sqrt(  (y2-y1)*(y2-y1)  + (x2-x1)*(x2-x1)  );
		},
		point_direction:function(x1,y1,x2,y2){
			return Math.atan2( y2-y1 , x2-x1 )  * 180/Math.PI;
		}
	};

	return Utility;
});