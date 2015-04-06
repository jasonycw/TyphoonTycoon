define([
	'units/structure',
	'stage',
	'config'
], function(Structure, Stage, Config) {
	//Create Tower Object and its constructor
	function University(game, startX, startY, spriteSrc) {
		// Call super constructor.
		Structure.call(this, startX, startY, spriteSrc, game, "University");

		this.game.built("University");
	}
	// subclass extends superclass
	University.prototype = Object.create(Structure.prototype);
	University.prototype.constructor = University;

	return University;
});
