define(["easel"], function(easel) {

	console.log("enemy.js loaded");

	var Enemy = function() {
		this.initialize();
	}
	
	var p = Enemy.prototype = new createjs.Container(); // inherit from Container

	p.Container_initialize = p.initialize;
	p.initialize = function() {
		this.Container_initialize();
		// add custom setup logic here.
	}

	return Enemy;

});