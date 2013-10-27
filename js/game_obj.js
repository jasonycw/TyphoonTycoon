define(["easel"], function(easel) {

	console.log("game_obj.js loaded");

	var GameObj = function() {
	  this.initialize();
	}
	
	var p = GameObj.prototype = new createjs.Container(); // inherit from Container

	p.Container_initialize = p.initialize;
	p.initialize = function() {
		this.Container_initialize();
		// add custom setup logic here.
	}

	return GameObj;

    }
);