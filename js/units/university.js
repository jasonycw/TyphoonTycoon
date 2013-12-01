define([
	'units/unit',
	'stage',
	'models/buildEffect',
	'config'
], function(Unit, Stage, BuildEffect, Config) {

	//Create Tower Object and its constructor
	function University(game, startX, startY, spriteSrc) {
		this.game = game;
		// Call super constructor.
		Unit.call(this, startX, startY, spriteSrc);
		var buildEffect = new BuildEffect(this.x, this.y, "#f2b7ff", 40, 40, 3);

		// Auto add to stage
		this.id = Stage.addChild(this, 'towers');

		this.game.built("University");
		this.game.addPower(Config.university.power);
	}
	// subclass extends superclass
	University.prototype = Object.create(Unit.prototype);
	University.prototype.constructor = University;

	University.prototype.remove = function() {
		this.game.destroyBuilding('University');
	};

	return University;
});