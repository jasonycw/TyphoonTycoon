define([
	'units/structure',
	'stage',
	'config'
], function(Structure, Stage, Config) {
	// Create Tower Object and its constructor
	function NuclearPlant(game, startX, startY, spriteSrc) {
		// Call super constructor.
		Structure.call(this, startX, startY, spriteSrc, game, "NuclearPlant");


	}
	// subclass extends superclass
	NuclearPlant.prototype = Object.create(Structure.prototype);
	NuclearPlant.prototype.constructor = NuclearPlant;

	NuclearPlant.canBeBuilt = Structure.canBeBuilt;
	NuclearPlant.fulfillTechReq =function(game){
		return game.isBuilt('ResearchCenter');
	};

	NuclearPlant.getCost =function(game){
		var cost = Config.NuclearPlant.cost;
		return cost;
	};

	return NuclearPlant;
});