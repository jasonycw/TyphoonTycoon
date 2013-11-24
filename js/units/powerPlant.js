// defines your module and loads any dependencies
define([
	'units/unit',
	'stage',
	'models/buildEffect',
	'config',
	'Game'
], function(Unit, Stage, BuildEffect, Config, Game) {

	//Create Tower Object and its constructor
	function PowerPlant(startX, startY, spriteSrc) {
		// Call super constructor.
		Unit.call(this, startX, startY, spriteSrc);
		var buildEffect = new BuildEffect(this.x, this.y, "green", 40, 40, 3);
		Game.addPower(Config.powerPlantPower);

		// Auto add to stage
		this.id = Stage.addChild(this, 'towers');
	}
	//subclass extends superclass
	PowerPlant.prototype = Object.create(Unit.prototype);
	PowerPlant.prototype.constructor = PowerPlant;


	// tick event handler
	// PowerPlant.prototype.tick = function(dt) {	// override
	// 	Game.addPower(Config.powerPlantPower);
	// };
	

	return PowerPlant;
});