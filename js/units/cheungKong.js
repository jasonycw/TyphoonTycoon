define([
	'units/structure',
	'stage',
	'config'
], function(Structure, Stage, Config) {
	// Create Tower Object and its constructor
	function CheungKong(game, startX, startY, spriteSrc) {
		// Call super constructor.
		Structure.call(this, startX, startY, spriteSrc, game, "CheungKong");

		this.game.built('CheungKongLimited');
	}
	// subclass extends superclass
	CheungKong.prototype = Object.create(Structure.prototype);
	CheungKong.prototype.constructor = CheungKong;

	CheungKong.canBeBuilt = Structure.canBeBuilt;
	CheungKong.fulfillTechReq =function(game){
		return game.isBuilt('ResearchCenter');
	};

	CheungKong.getCost =function(game){
		var cost = Config.CheungKong.cost;
		return cost;
	};

	
	return CheungKong;
});
