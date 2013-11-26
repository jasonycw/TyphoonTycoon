define([
	'units/unit',
	'stage',
	'models/buildEffect',
	'config',
	'Game'
], function(Unit, Stage, BuildEffect, Config, Game) {
	// Create Tower Object and its constructor
	function PowerPlant(startX, startY, spriteSrc) {
		// Call super constructor.
		Unit.call(this, startX, startY, spriteSrc);
		var buildEffect = new BuildEffect(this.x, this.y, "LawnGreen", 40, 40, 3);

		Game.addPower(Config.powerPlant.power);

		// Auto add to stage
		this.id = Stage.addChild(this, 'towers');
	}
	// subclass extends superclass
	PowerPlant.prototype = Object.create(Unit.prototype);
	PowerPlant.prototype.constructor = PowerPlant;

	return PowerPlant;
});