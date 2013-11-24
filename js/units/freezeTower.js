// defines your module and loads any dependencies
define([
	'units/unit',
	'stage',
	'units/tower',
	'models/buildEffect',
	'models/laser',
	'config',
	'Game'
], function(Unit,Stage,Tower,BuildEffect,Laser,Config,Game) {

	console.log("attackTower.js loaded");

	//Create Tower Object and its constructor
	function FreezeTower(startX,startY,spriteSrc){
		//call super constructor.
		Tower.call(this,startX,startY,spriteSrc);
		var buildEffect = new BuildEffect(this.x, this.y, "aqua", 40, 40, 3);
		Game.addPower(Config.freezeTowerPower);

		//Auto add to stage
		this.id = Stage.addChild(this,'towers');
		//var nearEnemy = this.findNearestEnemy();
		//nearEnemy.setMotion(0,0);
	}
	//subclass extends superclass
	FreezeTower.prototype = Object.create(Tower.prototype);
	FreezeTower.prototype.constructor = FreezeTower;


	// tick event handler
	FreezeTower.prototype.tick = function(dt){	// override
		/**
		 * finds the enemy closest in distance
		 * @return {Enemy} the enemy that is nearest
		 * @returns {undefined} if no enemy is alive
		 */
		var target = this.findNearestEnemy();
		if(target)
		{
			if(target.distance <= Config.maxFreezeDistance && Game.getAvailablePower() > 0)
			{
				// console.log("tower "+this.x+" "+ this.y);
				var laser = new Laser(this.x, this.y, target.targetEnemy.x, target.targetEnemy.y, "aqua", 20, 5);
				var buildEffect = new BuildEffect(target.targetEnemy.x, target.targetEnemy.y, "aqua", 15, 7, 1);
				target.targetEnemy.slow(Config.freezeTowerEffect);
				// Game.addPower(Config.freezeTowerPower);
			}
		}
	};
	

	return FreezeTower;
});