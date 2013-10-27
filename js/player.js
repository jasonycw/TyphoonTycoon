define(["easel"], function(easel) {

	console.log("player.js loaded");

	var Player = function() {
	  this.initialize();
	}
	
	var p = Player.prototype = new createjs.Container(); // inherit from Container

	p.Container_initialize = p.initialize;
	p.initialize = function() {
		this.Container_initialize();
		// add custom setup logic here.
	}

	return Player;

    }
);