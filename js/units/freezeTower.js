define([
	'units/unit',
	'stage',
	'units/tower',
	'models/laser',
	'config',
	'sound',
	'models/buildEffect'
], function(Unit, Stage, Tower, Laser, Config, Sound, BuildEffect)
{
	// Create Tower Object and its constructor
	function FreezeTower(game, startX, startY, spriteSrc)
	{
		// call super constructor.
		Tower.call(this, startX, startY, spriteSrc, game,
			"FreezeTower");

		this.sound = new Sound('freezeTowerSound');
	}


	// subclass extends superclass
	FreezeTower.prototype = Object.create(Tower.prototype);
	FreezeTower.prototype.constructor = FreezeTower;
	FreezeTower.canBeBuilt = Tower.canBeBuilt;

	FreezeTower.fulfillTechReq =function(game){
		return game.isBuilt('University');
	};

	FreezeTower.getCost =function(game){
		var cost = Config.FreezeTower.cost;
		if (game.isBuilt('ResearchCenter'))
			cost += Config.ResearchCenter.freezeTowerCostIncrease*game.numberOfBuilding('ResearchCenter');
		return cost;
	};

	// tick event handler
	FreezeTower.prototype.tick = function(dt)
	{ // override

		// calculate power based on structures built
		var range = this.config.range;
		var slowRate = this.config.slowRate;
		var attackDamage = this.config.attackDamage;
		if (this.game.isBuilt('ResearchCenter'))
		{
			range += Config.ResearchCenter.freezeTowerRangeIncrease *
				this.game.numberOfBuilding('ResearchCenter');
			slowRate += Config.ResearchCenter.freezeTowerSlowRateIncrease *
				this.game.numberOfBuilding('ResearchCenter');
			attackDamage += Config.ResearchCenter.freezeTowerAttackIncrease *
				this.game.numberOfBuilding('ResearchCenter');
		}

		// actual attack
		var nearestEnemy = this.findNearestEnemyWithin(range);

		if (nearestEnemy)
		{
			if (nearestEnemy.distance <= range &&
				this.game.getAvailablePower() >= 0)
			{
				this.sound.play('wrap');
				var laser = new Laser(this.x, this.y,
					nearestEnemy.target.x, nearestEnemy.target.y,
					"aqua", 20, 5);
				var buildEffect =
					new BuildEffect(nearestEnemy.target.x, nearestEnemy.target.y,
						"aqua", 0.4, 7, 1);
				nearestEnemy.target.slow(slowRate);
				nearestEnemy.target.damage(attackDamage);
			}
		}
	};

	return FreezeTower;
});
