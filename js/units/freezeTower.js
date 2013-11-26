// defines your module and loads any dependencies
define([
	'units/unit',
	'stage',
	'units/tower',
	'models/buildEffect',
	'models/laser',
	'config',
	'Game',
	'sound'
], function(Unit,Stage,Tower,BuildEffect,Laser,Config,Game,Sound) {

	console.log("freezeTower.js loaded");

	//Create Tower Object and its constructor
	function FreezeTower(startX,startY,spriteSrc){
		//call super constructor.
		Tower.call(this,startX,startY,spriteSrc);
		var buildEffect = new BuildEffect(this.x, this.y, "aqua", 40, 40, 3);
		Game.addPower(Config.freezeTower.power);

		//Auto add to stage
		//this.id = Stage.addChild(this,'towers');

		this.sound = new Sound('freezeTowerSound');
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
			if(target.distance <= Config.freezeTower.range && Game.getAvailablePower() > 0)
			{
				// console.log("tower "+this.x+" "+ this.y);
				this.sound.play('wrap');
				var laser = new Laser(this.x, this.y, target.target.x, target.target.y, "aqua", 20, 5);
				var buildEffect = new BuildEffect(target.target.x, target.target.y, "aqua", 15, 7, 1);
				target.target.slow(Config.freezeTower.slowRate);
				target.target.damage(Config.freezeTower.attackDamage);
			}
		}
	};
	

	return FreezeTower;
});