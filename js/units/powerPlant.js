define([
	'units/unit',
	'stage',
	'models/buildEffect',
	'config'
], function(Unit, Stage, BuildEffect, Config) {
	// Create Tower Object and its constructor
	function PowerPlant(game, startX, startY, spriteSrc) {
		// Call super constructor.
		Unit.call(this, startX, startY, spriteSrc, game);
		this.name = "PowerPlant";
		var buildEffect = new BuildEffect(this.x, this.y, "LawnGreen", 40, 40, 3);

		this.game.addPower(Config.PowerPlant.power);

		// Auto add to stage
		this.id = Stage.addChild(this, 'towers');
	}
	// subclass extends superclass
	PowerPlant.prototype = Object.create(Unit.prototype);
	PowerPlant.prototype.constructor = PowerPlant;

	PowerPlant.prototype.remove = function() {
		// return the power it got
		this.game.reducePower(Config[this.name].power);
	}

	return PowerPlant;
});