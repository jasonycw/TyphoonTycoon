define([
	'units/unit',
	'stage',
	'units/tower',
	'models/buildEffect',
	'models/laser',
	'config',
	'Game',
	'sound'
], function(Unit, Stage, Tower, BuildEffect, Laser, Config, Game, Sound) {
	// Create Tower Object and its constructor
	function FreezeTower(startX, startY, spriteSrc) {
		// call super constructor.
		Tower.call(this, startX, startY, spriteSrc);
		var buildEffect = new BuildEffect(this.x, this.y, "aqua", 40, 40, 3);
		Game.addPower(Config.freezeTower.power);

		this.sound = new Sound('freezeTowerSound');
	}


	// subclass extends superclass
	FreezeTower.prototype = Object.create(Tower.prototype);
	FreezeTower.prototype.constructor = FreezeTower;


	// tick event handler
	FreezeTower.prototype.tick = function(dt) { // override
		var target = this.findNearestEnemy();

		var range = Config.freezeTower.range;
		var slowRate = Config.freezeTower.slowRate;
		var attackDamage = Config.freezeTower.attackDamage;
		if (Game.isBuilt('ResearchCenter')) {
			range += Config.researchCenter.freezeTowerRangeIncrease;
			slowRate += Config.researchCenter.freezeTowerSlowRateIncrease;
			attackDamage += Config.researchCenter.freezeTowerAttackIncrease;
		}


		if (target) {
			if (target.distance <= range && Game.getAvailablePower() > 0) {
				this.sound.play('wrap');
				var laser = new Laser(this.x, this.y, target.target.x, target.target.y, "aqua", 20, 5);
				var buildEffect = new BuildEffect(target.target.x, target.target.y, "aqua", 15, 7, 1);
				target.target.slow(slowRate);
				target.target.damage(attackDamage);
			}
		}
	};

	return FreezeTower;
});