// defines your module and loads any dependencies
define([
	'Utility',
	'units/unit',
	'stage',
	'sound',
	'units/tower',
	'models/buildEffect',
	'models/laser',
	'config',
	'Game'
], function(Utility,Unit,Stage,Sound,Tower,BuildEffect,Laser,Config,Game) {

	console.log("attackTower.js loaded");

	//Create Tower Object and its constructor
	function AttackTower(startX,startY,spriteSrc){
		//call super constructor.
		Tower.call(this,startX,startY,spriteSrc);
		this.coolDownTime = 15;
		this.coolDownCounter = 0;
		var buildEffect = new BuildEffect(this.x, this.y, "red", 40, 40, 3);
		Game.addPower(Config.laserTowerPower);
		this.sound = new Sound('laserTowerSound');

		//Auto add to stage
		this.id = Stage.addChild(this,'towers');
		//var nearEnemy = this.findNearestEnemy();
		//nearEnemy.setMotion(0,0);
	}

	// config
	// TODO replace all magic number with const static variables
	AttackTower.range = 150;
	AttackTower.attackDamage = 10;

	//subclass extends superclass
	AttackTower.prototype = Object.create(Tower.prototype);
	AttackTower.prototype.constructor = AttackTower;


	// tick event handler
	AttackTower.prototype.tick = function(dt){	// override
		/**
		 * finds the enemy closest in distance
		 * @return {Enemy} the enemy that is nearest
		 * @returns {undefined} if no enemy is alive
		 */
		if(this.coolDownCounter<=0){
			var that = this;
			var target = this.findNearestEnemy();
			if(target)
			{
				if(target.distance <= AttackTower.range && Game.getAvailablePower() > 0)
				{
					// console.log("tower "+this.x+" "+ this.y);
					var enemyWidth = target.targetEnemy.sprite.width;
					var aimX = target.targetEnemy.x - enemyWidth/8+ Math.random()*enemyWidth/4;
					var aimY = target.targetEnemy.y - enemyWidth/8+ Math.random()*enemyWidth/4;
					var laser = new Laser(this.x, this.y, aimX, aimY, "red", 10, 3);
					that.sound.play('laser');
					var buildEffect = new BuildEffect(aimX,aimY, "red", 15, 7, 1);
					target.targetEnemy.damage(AttackTower.attackDamage);
					this.coolDownCounter = this.coolDownTime;
					// Game.addPower(Config.laserTowerPower);
				}
			}
		}else{
			this.coolDownCounter--;
		}
	};

	

	return AttackTower;
});