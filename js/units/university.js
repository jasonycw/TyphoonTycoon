// defines your module and loads any dependencies
define([
	'units/unit',
	'stage',
	'models/buildEffect',
	'config',
	'Game'
], function(Unit, Stage, BuildEffect, Config, Game) {

	//Create Tower Object and its constructor
	function University(startX, startY, spriteSrc) {
		// Call super constructor.
		Unit.call(this, startX, startY, spriteSrc);
		var buildEffect = new BuildEffect(this.x, this.y, "#f2b7ff", 40, 40, 3);

		// Auto add to stage
		this.id = Stage.addChild(this, 'towers');

		Game.built("University");
		Game.addPower(Config.university.power);
	}
	// subclass extends superclass
	University.prototype = Object.create(Unit.prototype);
	University.prototype.constructor = University;
	
	return University;
});