define(["easel"], function(easel) {

	console.log("building.js loaded");
	var Building = function() {
	  this.initialize();
	}
	
	var p = Building.prototype = new createjs.Container(); // inherit from Container

	p.Container_initialize = p.initialize;
	p.initialize = function() {
		this.Container_initialize();
		// add custom setup logic here.
	}

	return Building;

    }
);