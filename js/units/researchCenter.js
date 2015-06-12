define([
	'units/structure',
	'stage',
	'config'
], function(Structure, Stage, Config) {
	// Create Tower Object and its constructor
	function ResearchCenter(game, startX, startY, spriteSrc) {
		// Call super constructor.
		Structure.call(this, startX, startY, spriteSrc, game, "ResearchCenter");

		this.game.built('ResearchCenter');
	}
	// subclass extends superclass
	ResearchCenter.prototype = Object.create(Structure.prototype);
	ResearchCenter.prototype.constructor = ResearchCenter;
	
	ResearchCenter.canBeBuilt = Structure.canBeBuilt;
	ResearchCenter.fulfillTechReq =function(game){
		return game.isBuilt('University');
	};

	ResearchCenter.getCost =function(game){
		var cost = Config.ResearchCenter.cost;
		return cost;
	};

	return ResearchCenter;
});
