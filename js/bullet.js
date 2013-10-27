define(["easel"], function(easel) {

	console.log("bullet.js loaded");

	var Bullet = function() {
	  this.initialize();
	}
	
	var p = Bullet.prototype = new createjs.Container(); // inherit from Container

	p.Container_initialize = p.initialize;
	p.initialize = function() {
		this.Container_initialize();
		// add custom setup logic here.
	}

	return Bullet;

    }
);