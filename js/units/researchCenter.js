// defines your module and loads any dependencies
define([
	'units/unit',
	'stage',
	'models/buildEffect',
	'config',
	'Game'
], function(Unit, Stage, BuildEffect, Config, Game) {

	//Create Tower Object and its constructor
	function ResearchCenter(startX, startY, spriteSrc) {
		// Call super constructor.
		Unit.call(this, startX, startY, spriteSrc);
		var buildEffect = new BuildEffect(this.x, this.y, "#ffcb8e", 40, 40, 3);

		// Auto add to stage
		this.id = Stage.addChild(this, 'towers');

		Game.addPower(Config.researchCenterPower);
	}
	// subclass extends superclass
	ResearchCenter.prototype = Object.create(Unit.prototype);
	ResearchCenter.prototype.constructor = ResearchCenter;
	
	return ResearchCenter;
});