define([
	'Utility',
	'units/tower',
	'models/buildEffect',
	'models/laser',
	'config',
	'Game',
	'sound'
], function(Utility, Tower, BuildEffect, Laser, Config, Game, Sound) {
	// Create Tower Object and its constructor
	function ReflectTower(startX, startY, spriteSrc) {
		// call super constructor.
		Tower.call(this, startX, startY, spriteSrc);
		var buildEffect = new BuildEffect(this.x, this.y, "#FF8000", 40, 40, 3);
		Game.addPower(Config.repelTower.power);

		this.sound = new Sound('reflectTowerSound');
	}

	//subclass extends superclass
	ReflectTower.prototype = Object.create(Tower.prototype);
	ReflectTower.prototype.constructor = ReflectTower;

	// tick event handler
	ReflectTower.prototype.tick = function(dt) { // override
		var target = this.findNearestEnemy();
		if (target) {
			var range = Config.repelTower.range;
			var force = Config.repelTower.force;

			if (Game.isBuilt('CheungKongLimited')) {
				range += Config.cheungKong.repelTowerRangeIncrease*Game.numberOfBuilding('CheungKongLimited');
				force += Config.cheungKong.repelTowerForceIncrease*Game.numberOfBuilding('CheungKongLimited');
			}
			if (target.distance <= range && Game.getAvailablePower() > 0) {
				this.sound.play('electricity');
				var laser = new Laser(this.x, this.y, target.target.x, target.target.y, "#FF8000", 20, 15);
				var distanceFromTyphoonToTower = Utility.pointDistance(this.x, this.y, target.target.x, target.target.y);
				target.target.addMotion(Utility.pointDirection(Config.hkArea.x, Config.hkArea.y, target.target.x, target.target.y), force / distanceFromTyphoonToTower / distanceFromTyphoonToTower);
			}
		}
	};


	return ReflectTower;
});