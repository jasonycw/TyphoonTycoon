define([
	'sound',
	'units/tower',
	'models/laser',
	'config',
	'models/buildEffect'
], function(Sound, Tower, Laser, Config, BuildEffect) {
	// Create Tower Object and its constructor
	function AttackTower(game, startX, startY, spriteSrc) {
		//call super constructor.
		Tower.call(this, startX, startY, spriteSrc, game, "AttackTower");
		this.coolDownTime = 15;
		this.coolDownCounter = 0;
		this.sound = new Sound('attackTowerSound');
	}

	// subclass extends superclass
	AttackTower.prototype = Object.create(Tower.prototype);
	AttackTower.prototype.constructor = AttackTower;


	// tick event handler
	AttackTower.prototype.tick = function(dt) { // override
		if (this.coolDownCounter <= 0) {
			var that = this;
			var nearestEnemy = this.findNearestEnemyWithin(Config.AttackTower.range);

			var range = Config.AttackTower.range;
			var attackDamage = Config.AttackTower.attackDamage;
			if (this.game.isBuilt('University')) {
				range += Config.University.attackTowerRangeIncrease*this.game.numberOfBuilding('University');
				attackDamage += Config.University.attackTowerAttackIncrease*this.game.numberOfBuilding('University');
			}
			if (this.game.isBuilt('ResearchCenter')) {
				range += Config.ResearchCenter.attackTowerRangeIncrease*this.game.numberOfBuilding('ResearchCenter');
				attackDamage += Config.ResearchCenter.attackTowerAttackIncrease*this.game.numberOfBuilding('ResearchCenter');
			}

			if (nearestEnemy) {
				if (nearestEnemy.distance <= range && this.game.getAvailablePower() > 0) {
					var enemyWidth = nearestEnemy.target.sprite.width;
					var aimX = nearestEnemy.target.x - enemyWidth / 8 + Math.random() * enemyWidth / 4;
					var aimY = nearestEnemy.target.y - enemyWidth / 8 + Math.random() * enemyWidth / 4;
					var laser = new Laser(this.x, this.y, aimX, aimY, "red", 10, 3);
					that.sound.play('laser');
					var buildEffect = new BuildEffect(aimX, aimY, "red", 15, 7, 1);
					nearestEnemy.target.damage(attackDamage);
					this.coolDownCounter = this.coolDownTime;
				}
			}
		} else {
			this.coolDownCounter--;
		}
	};



	return AttackTower;
});