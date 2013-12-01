define([
	'units/unit',
	'stage',
	'models/buildEffect',
	'config'
], function(Unit, Stage, BuildEffect, Config) {
	// Create Tower Object and its constructor
	function ResearchCenter(game, startX, startY, spriteSrc) {
		this.game = game;
		// Call super constructor.
		Unit.call(this, startX, startY, spriteSrc);
		var buildEffect = new BuildEffect(this.x, this.y, "#ffcb8e", 40, 40, 3);

		// Auto add to stage
		this.id = Stage.addChild(this, 'towers');

		this.game.built('ResearchCenter');
		this.game.addPower(Config.researchCenter.power);
	}
	// subclass extends superclass
	ResearchCenter.prototype = Object.create(Unit.prototype);
	ResearchCenter.prototype.constructor = ResearchCenter;

	ResearchCenter.prototype.remove = function() {
		this.game.destroyBuilding('ResearchCenter');
	};
	
	return ResearchCenter;
});