define(["easel"], function(easel) {

	console.log("ui.js loaded");

	var UI = function() {
	  this.initialize();
	}
	
	var p = UI.prototype = new createjs.Container(); // inherit from Container

	p.Container_initialize = p.initialize;
	p.initialize = function() {
		this.Container_initialize();
		// add custom setup logic here.
	}

	return UI;

    }
);