// defines your module and loads any dependencies
define([
	'units/unit',
	'stage',
	'models/buildEffect',
	'config',
	'Game'
], function(Unit, Stage, BuildEffect, Config, Game) {

	//Create Tower Object and its constructor
	function CheungKong(startX, startY, spriteSrc) {
		// Call super constructor.
		Unit.call(this, startX, startY, spriteSrc);
		var buildEffect = new BuildEffect(this.x, this.y, "Red", 40, 40, 3);
		
		// Auto add to stage
		this.id = Stage.addChild(this, 'towers');

		Game.addPower(Config.cheungKongPower);
	}
	
	// subclass extends superclass
	CheungKong.prototype = Object.create(Unit.prototype);
	CheungKong.prototype.constructor = CheungKong;
	
	return CheungKong;
});