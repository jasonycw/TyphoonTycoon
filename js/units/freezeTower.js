define([
	'units/unit',
	'stage',
	'units/tower',
	'models/buildEffect',
	'models/laser',
	'config',
	'sound'
], function(Unit, Stage, Tower, BuildEffect, Laser, Config, Sound) {
	// Create Tower Object and its constructor
	function FreezeTower(game, startX, startY, spriteSrc) {
		this.game = game;
		// call super constructor.
		Tower.call(this, startX, startY, spriteSrc);
		var buildEffect = new BuildEffect(this.x, this.y, "aqua", 40, 40, 3);
		this.game.addPower(Config.freezeTower.power);

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
		if (this.game.isBuilt('ResearchCenter')) {
			range += Config.researchCenter.freezeTowerRangeIncrease*this.game.numberOfBuilding('ResearchCenter');
			slowRate += Config.researchCenter.freezeTowerSlowRateIncrease*this.game.numberOfBuilding('ResearchCenter');
			attackDamage += Config.researchCenter.freezeTowerAttackIncrease*this.game.numberOfBuilding('ResearchCenter');
		}


		if (target) {
			if (target.distance <= range && this.game.getAvailablePower() > 0) {
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