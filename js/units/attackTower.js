define([
	'sound',
	'units/tower',
	'models/laser',
	'config',
	'models/buildEffect'
], function(Sound, Tower, Laser, Config, BuildEffect)
{
	// Create Tower Object and its constructor
	function AttackTower(game, startX, startY, spriteSrc)
	{
		//call super constructor.
		Tower.call(this, startX, startY, spriteSrc, game,
			"AttackTower");
		this.coolDownTime = 15;
		this.coolDownCounter = 0;
		this.sound = new Sound('attackTowerSound');
	}

	// subclass extends superclass
	AttackTower.prototype = Object.create(Tower.prototype);
	AttackTower.prototype.constructor = AttackTower;


	// tick event handler
	AttackTower.prototype.tick = function(dt)
	{ // override
		if (this.coolDownCounter <= 0)
		{

			// calculate power based on structures built
			var _range = this.config.range;
			var _attackDamage = this.config.attackDamage;
			if (this.game.isBuilt('University'))
			{
				_range += Config.University.attackTowerRangeIncrease *
					this.game.numberOfBuilding('University');
				_attackDamage += Config.University.attackTowerAttackIncrease *
					this.game.numberOfBuilding('University');
			}
			if (this.game.isBuilt('ResearchCenter'))
			{
				_range += Config.ResearchCenter.attackTowerRangeIncrease *
					this.game.numberOfBuilding('ResearchCenter');
				_attackDamage += Config.ResearchCenter.attackTowerAttackIncrease *
					this.game.numberOfBuilding('ResearchCenter');
			}

			// actual attack
			var nearestEnemy = this.findNearestEnemyWithin(_range);

			if (nearestEnemy)
			{
				if (nearestEnemy.distance <= _range &&
					this.game.getAvailablePower() >= 0)
				{
					var enemyWidth = nearestEnemy.target.sprite.width;
					var aimX = nearestEnemy.target.x - enemyWidth /
						8 + Math.random() * enemyWidth / 4;
					var aimY = nearestEnemy.target.y - enemyWidth /
						8 + Math.random() * enemyWidth / 4;
					var laser = new Laser(this.x, this.y, aimX,
						aimY, "red", 10, 3);
					this.sound.play('laser');
					var buildEffect = new BuildEffect(aimX, aimY,
						"red", 0.4, 7, 1);

					nearestEnemy.target.damage(_attackDamage);
					this.coolDownCounter = this.coolDownTime;
				}
			}
		}
		else
		{
			this.coolDownCounter--;
		}
	};



	return AttackTower;
});
