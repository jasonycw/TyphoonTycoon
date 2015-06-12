define([
	'utility',
	'units/tower',
	'models/buildEffect',
	'models/laser',
	'config',
	'sound'
], function(Utility, Tower, BuildEffect, Laser, Config, Sound) {
	// Create Tower Object and its constructor
	function RepelTower(game, startX, startY, spriteSrc) {
		// call super constructor.
		Tower.call(this, startX, startY, spriteSrc, game, "RepelTower");

		this.sound = new Sound('reflectTowerSound');
	}

	//subclass extends superclass
	RepelTower.prototype = Object.create(Tower.prototype);
	RepelTower.prototype.constructor = RepelTower;

	RepelTower.canBeBuilt = Tower.canBeBuilt;
	RepelTower.fulfillTechReq =function(game){
		return game.isBuilt('ResearchCenter');
	};

	RepelTower.getCost =function(game){
		var cost = Config.RepelTower.cost;
		if (game.isBuilt('CheungKongLimited'))
			cost -= Config.CheungKong.repelTowerCostDecrease*game.numberOfBuilding('CheungKongLimited');
		return cost;
	};
	
	// tick event handler
	RepelTower.prototype.tick = function(dt) { // override
		var target = this.findNearestEnemy();
		if (target) {
			var range = Config.RepelTower.range;
			var force = Config.RepelTower.force;

			if (this.game.isBuilt('CheungKongLimited')) {
				range += Config.CheungKong.repelTowerRangeIncrease*this.game.numberOfBuilding('CheungKongLimited');
				force += Config.CheungKong.repelTowerForceIncrease*this.game.numberOfBuilding('CheungKongLimited');
			}
			if (target.distance <= range && this.game.getAvailablePower() >= 0) {
				this.sound.play('electricity');
				var laser = new Laser(this.x, this.y, target.target.x, target.target.y, "#FF8000", 20, 15);
				var distanceFromTyphoonToTower = Utility.pointDistance(this.x, this.y, target.target.x, target.target.y);
				target.target.addMotion(Utility.pointDirection(Config.hkArea.x, Config.hkArea.y, target.target.x, target.target.y), force / distanceFromTyphoonToTower / distanceFromTyphoonToTower);
			}
		}
	};


	return RepelTower;
});