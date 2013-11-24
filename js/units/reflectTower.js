// defines your module and loads any dependencies
define([
	'Utility',
	'units/unit',
	'stage',
	'units/tower',
	'models/buildEffect',
	'models/laser',
	'config',
	'Game'
], function(Utility,Unit,Stage,Tower,BuildEffect,Laser,Config,Game) {

	console.log("attackTower.js loaded");

	//Create Tower Object and its constructor
	function ReflectTower(startX,startY,spriteSrc){
		//call super constructor.
		Tower.call(this,startX,startY,spriteSrc);
		var buildEffect = new BuildEffect(this.x, this.y, "#FF8000", 40, 40, 3);
		Game.addPower(Config.repelTowerPower);

		//Auto add to stage
		this.id = Stage.addChild(this,'towers');
		//var nearEnemy = this.findNearestEnemy();
		//nearEnemy.setMotion(0,0);
	}
	//subclass extends superclass
	ReflectTower.prototype = Object.create(Tower.prototype);
	ReflectTower.prototype.constructor = ReflectTower;


	// tick event handler
	ReflectTower.prototype.tick = function(dt){	// override
		/**
		 * finds the enemy closest in distance
		 * @return {Enemy} the enemy that is nearest
		 * @returns {undefined} if no enemy is alive
		 */
		var target = this.findNearestEnemy();
		if(target)
		{
			if(target.distance <= Config.maxReflectDistance && Game.getAvailablePower() > 0)
			{
				// console.log("tower "+this.x+" "+ this.y);
				var laser = new Laser(this.x, this.y, target.targetEnemy.x, target.targetEnemy.y, "#FF8000", 20,15);
				var distanceFromTyphoonToTower = Utility.pointDistance(this.x,this.y,target.targetEnemy.x,target.targetEnemy.y);
				target.targetEnemy.addMotion(Utility.pointDirection(this.x,this.y,target.targetEnemy.x,target.targetEnemy.y),300/distanceFromTyphoonToTower/distanceFromTyphoonToTower);
				// Game.addPower(Config.repelTowerPower);
			}
		}
	};
	

	return ReflectTower;
});