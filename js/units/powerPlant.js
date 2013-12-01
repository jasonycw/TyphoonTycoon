define([
	'units/unit',
	'stage',
	'models/buildEffect',
	'config'
], function(Unit, Stage, BuildEffect, Config) {
	// Create Tower Object and its constructor
	function PowerPlant(game, startX, startY, spriteSrc) {
		this.game = game;
		// Call super constructor.
		Unit.call(this, startX, startY, spriteSrc);
		var buildEffect = new BuildEffect(this.x, this.y, "LawnGreen", 40, 40, 3);

		this.game.addPower(Config.powerPlant.power);

		// Auto add to stage
		this.id = Stage.addChild(this, 'towers');
	}
	// subclass extends superclass
	PowerPlant.prototype = Object.create(Unit.prototype);
	PowerPlant.prototype.constructor = PowerPlant;

	return PowerPlant;
});