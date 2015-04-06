define([
	'units/unit',
	'stage',
	'units/tower',
	'models/laser',
	'config',
	'sound',
	'models/buildEffect'
], function(Unit, Stage, Tower, Laser, Config, Sound, BuildEffect) {
	// Create Tower Object and its constructor
	function FreezeTower(game, startX, startY, spriteSrc) {
		// call super constructor.
		Tower.call(this, startX, startY, spriteSrc, game, "FreezeTower");

		this.sound = new Sound('freezeTowerSound');
	}


	// subclass extends superclass
	FreezeTower.prototype = Object.create(Tower.prototype);
	FreezeTower.prototype.constructor = FreezeTower;


	// tick event handler
	FreezeTower.prototype.tick = function(dt) { // override
		var target = this.findNearestEnemy();

		var range = Config.FreezeTower.range;
		var slowRate = Config.FreezeTower.slowRate;
		var attackDamage = Config.FreezeTower.attackDamage;
		if (this.game.isBuilt('ResearchCenter')) {
			range += Config.ResearchCenter.freezeTowerRangeIncrease*this.game.numberOfBuilding('ResearchCenter');
			slowRate += Config.ResearchCenter.freezeTowerSlowRateIncrease*this.game.numberOfBuilding('ResearchCenter');
			attackDamage += Config.ResearchCenter.freezeTowerAttackIncrease*this.game.numberOfBuilding('ResearchCenter');
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