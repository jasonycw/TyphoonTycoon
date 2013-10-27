define(["easel"], function(easel) {

	console.log("utility.js loaded");

	var Utility = function() {
		this.initialize();
	}
	
	var p = Utility.prototype = new createjs.Container(); // inherit from Container

	p.Container_initialize = p.initialize;
	p.initialize = function() {
		this.Container_initialize();
		// add custom setup logic here.
	}

	return Utility;
});