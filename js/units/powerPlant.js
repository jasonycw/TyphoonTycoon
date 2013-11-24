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

		// Auto add to stage
		this.id = Stage.addChild(this, 'towers');
		console.log(Game.addPower);
	}
	//subclass extends superclass
	PowerPlant.prototype = Object.create(Unit.prototype);
	PowerPlant.prototype.constructor = PowerPlant;


	// tick event handler
	PowerPlant.prototype.tick = function(dt) {	// override
		Game.addPower(Config.powerPlantGenerate);
	};
	

	return PowerPlant;
});