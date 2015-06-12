define([
	'units/structure',
	'stage',
	'config'
], function(Structure, Stage, Config) {
	// Create Tower Object and its constructor
	function PowerPlant(game, startX, startY, spriteSrc) {
		// Call super constructor.
		Structure.call(this, startX, startY, spriteSrc, game, "PowerPlant");

	}
	// subclass extends superclass
	PowerPlant.prototype = Object.create(Structure.prototype);
	PowerPlant.prototype.constructor = PowerPlant;

	PowerPlant.canBeBuilt = Structure.canBeBuilt;
	
	PowerPlant.fulfillTechReq =function(game){
		return true;
	};

	PowerPlant.getCost =function(game){
		var cost = Config.PowerPlant.cost;
		return cost;
	};

	return PowerPlant;
});
