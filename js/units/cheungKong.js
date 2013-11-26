// defines your module and loads any dependencies
define([
	'units/unit',
	'stage',
	'models/buildEffect',
	'config',
	'Game'
], function(Unit, Stage, BuildEffect, Config, Game) {
	console.log("cheungKong.js loaded");

	//Create Tower Object and its constructor
	function CheungKong(startX, startY, spriteSrc) {
		// Call super constructor.
		Unit.call(this, startX, startY, spriteSrc);
		var buildEffect = new BuildEffect(this.x, this.y, "Red", 40, 40, 3);
		
		// Auto add to stage
		this.id = Stage.addChild(this, 'towers');

		Game.built('CheungKongLimited');
		Game.addPower(Config.cheungKong.power);
	}
	
	// subclass extends superclass
	CheungKong.prototype = Object.create(Unit.prototype);
	CheungKong.prototype.constructor = CheungKong;
	
	return CheungKong;
});