define(["easel"], function(easel) {

	console.log("enemy.js loaded");

	var Enemy = function() {
		this.initialize();
		this.max_hp = 100;
		this.hp = max_hp;
		this.radius=10;
	}
	
	var p = Enemy.prototype = new createjs.Container(); // inherit from Container

	p.Container_initialize = p.initialize;
	p.initialize = function() {
		this.Container_initialize();
		// add custom setup logic here.

	}

	return Enemy;

});