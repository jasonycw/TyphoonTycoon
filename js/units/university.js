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

	University.canBeBuilt = Structure.canBeBuilt;
	University.fulfillTechReq =function(game){
		return true;
	};

	University.getCost =function(game){
		var cost = Config.University.cost;
		return cost;
	};

	return University;
});
