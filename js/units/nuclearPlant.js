// defines your module and loads any dependencies
define([
	'units/unit',
	'stage',
	'models/buildEffect',
	'config',
	'Game'
], function(Unit, Stage, BuildEffect, Config, Game) {

	//Create Tower Object and its constructor
	function NuclearPlant(startX, startY, spriteSrc) {
		// Call super constructor.
		Unit.call(this, startX, startY, spriteSrc);
		var buildEffect = new BuildEffect(this.x, this.y, "LawnGreen", 40, 40, 3);
		Game.addPower(Config.nuclearPlant.power);

		// Auto add to stage
		this.id = Stage.addChild(this, 'towers');
	}
	//subclass extends superclass
	NuclearPlant.prototype = Object.create(Unit.prototype);
	NuclearPlant.prototype.constructor = NuclearPlant;


	// tick event handler
	// NuclearPlant.prototype.tick = function(dt) {	// override
	// 	Game.addPower(Config.NuclearPlantPower);
	// };
	

	return NuclearPlant;
});