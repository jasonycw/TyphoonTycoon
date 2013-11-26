// defines your module and loads any dependencies
define([
	'units/unit',
	'stage',
	'utility',
	'models/mapHitArea',
	'config'
], function(Unit,Stage,Utility,MapHitArea,Config)
{
	console.log("enemy.js loaded");

	// TODO: rename it back to Typhoon when Earthquake is created
	function Enemy(startX,startY,spriteSrc){
		//call super constructor.
		Unit.call(this,startX,startY,spriteSrc);
		this.direction 	= 	0 ;
		this.speed 		=	0 ;
		this.force 		= 	{dir:0,mag:0};
		this.hp 		= 	(Math.random()*0.7+0.3)*Config.enemy.max_hp;
		this.numberOfTicks = 0;
		this.isSlowed	=	0;
		this.typhoonID = Stage.addChild(this,'typhoons');
	}
	

	//subclass extends superclass
	Enemy.prototype = Object.create(Unit.prototype);
	Enemy.prototype.constructor = Enemy;

	// tick event handler
	Enemy.prototype.tick = function(dt){	// override
		this.addMotion(
						Utility.pointDirection(this.x,this.y,Config.hkArea.x,Config.hkArea.y),
						0.05
						);
		this.updatePosition();

		// absorb the nearby weak enemy
		var nearestTyphoon = this.findNearestTyphoon();
		if(nearestTyphoon)
		{
			if(nearestTyphoon.distance <= 30)
			{
				//console.log("2 typhoons are nearby.");
				var absorbRate = Config.enemy.absorbRate;
				if(this.hp<nearestTyphoon.target.hp)
					absorbRate = -Config.enemy.absorbRate;
				//console.log("original: "+this.hp+"   "+nearestTyphoon.target.hp);
				nearestTyphoon.target.damage(absorbRate);
				this.damage(-absorbRate);
				//console.log("changed: "+this.hp+"   "+nearestTyphoon.target.hp);
			}
		}
		// if(Utility.pointDistance(this.x,this.y,Config.hkArea.x,Config.hkArea.y) <= Config.hkArea.effectAreaRadius)
		// 	Game.affectHSI(-Config.enemy.damage);
		// remove it if out of stage
		if(! this.isWithinCanvas() ){
			this.remove();
		}
		this.numberOfTicks++;

	};
	Enemy.prototype.render = function(ctx){

		if(this.spriteReady){
			//draw image
			// ctx.save();
			ctx.globalAlpha = (this.hp/Config.enemy.max_hp)*0.9;
			var drawX = this.x - this.spriteOrigin.x;
			var drawY = this.y - this.spriteOrigin.y;
			this.drawRotatedImage(ctx,this.sprite,this.x,this.y,this.numberOfTicks);
			// ctx.drawImage(this.sprite,drawX,drawY);
			// ctx.restore();
			ctx.globalAlpha = 1;
			// ctx.fillText(this.typhoonID,this.x,this.y);
			// ctx.fillText(this.isSlowed,this.x,this.y);
			ctx.fillText(this.hp,this.x,this.y);

		}
	};

	// <position functions>
	Enemy.prototype.updatePosition = function(){
		// force -> velocity
		if(this.force.mag!=0){
			this.addMotion(this.force.dir,this.force.mag);
		}
		// velocity -> displacement
		// apply slow effect
		var tempSpeed = this.speed;
		if(this.isSlowed>0) {
			this.isSlowed-=1;
			tempSpeed = this.speed* (1-this.isSlowed/150*0.8);
		}
		// move it
		var addX = Math.cos(this.direction/180*Math.PI) * tempSpeed;
		var addY = Math.sin(this.direction/180*Math.PI) * tempSpeed;
		this.x += addX;
		this.y += addY;


		// Calculate if it will decade or recover
		if(MapHitArea.isLand(this.x,this.y)){
			this.damage(Config.enemy.max_hp*0.013);
		}
		if(tempSpeed<0.1){
			this.damage(Config.enemy.max_hp*0.005);
		}else{
			this.damage(-1*Config.enemy.max_hp*0.003);
		}
	};
	/**
	 * get the current motion of the typhoon
	 * @return {object{dir,sp}} a force object containing direction and speed of the typhoon
	 */
	Enemy.prototype.getMotion = function(){
		return {
			dir:this.direction,
			sp:this.speed
		};
	};
	/**
	 * Sets the motion of the typhoon, ignoring  previous values
	 * @param {number} dir Direction of typhoon
	 * @param {number} sp  Speed of typhoon
	 */
	Enemy.prototype.setMotion = function(dir,sp){
		this.direction = dir;
		this.speed = sp;

	};
	/**
	 * alters the motion by a little bit
	 * @param {number} force_dir       direction of force applied
	 * @param {number} force_magnitude magnitude of force applied
	 */
	Enemy.prototype.addMotion = function(force_dir,force_magnitude){
			newVelo = Utility.vectorSum({dir:this.direction,mag:this.speed},
										{dir:force_dir,mag:force_magnitude});
			this.direction  = newVelo.dir;
			this.speed 		= newVelo.mag;
	};
	/**
	 * gets the current total force experienced by the object
	 * @return {object{dir,mag}} force: direction, magnitude of total force currently received
	 */
	Enemy.prototype.getForce = function(){
		return this.force;
	};
	/**
	 * sets the motion of the typhoon, ignoring previous values
	 * @param {object{dir,mag}} force: direction, magnitude of force applied
	 */
	Enemy.prototype.setForce = function(force){
		this.force = force;
	};
	/**
	 * Modifies the current force object
	 * @param {object{dir,mag}} force amount of force applied
	 */
	Enemy.prototype.addForce = function(force){
			this.force = Utility.vectorSum(this.force,force);
	};
	// </position functions>
	/**
	 * applies damage to itself. this would be killed if it has no hp
	 * @param  {int/float} dmg amount of damage to apply
	 * @return {void}
	 */
	Enemy.prototype.damage = function(dmg){

		if(!isNaN(dmg))
			this.hp-=dmg;
		else
			console.log(this.tyhoonID, this.hp, dmg);
		
		if(this.hp<=0){
			this.kill();
		}
	};
	/**
	 * applies slow to itself.
	 * @param  {int/float} speed amount to be applied
	 * @return {void}
	 */
	Enemy.prototype.slow = function(speed){
		if(this.isSlowed<150)
			this.isSlowed++;
	};
	/**
	 * kill the unit, with death effect
	 */
	Enemy.prototype.kill = function(){
		// effects here

		// call basic remove function
		this.remove();
	};
	Enemy.prototype.remove = function(){
		Stage.removeChild(this.typhoonID,'typhoons');
	};

	Enemy.prototype.findNearestTyphoon = function(){
		// console.log("1");
		var nearestTyphoon=null;
		var nearestDist = 10000000;
		// console.log(nearestDist);
		var tempEnemy	// reused variable
		var dist;		// reused variable
		for(var t in Stage.displayList['typhoons']){
			if(t == this.typhoonID)
				continue;
			
			tempEnemy = Stage.displayList['typhoons'][t];
			dist = Utility.pointDistance(	this.x,this.y,
											tempEnemy.x,tempEnemy.y);
			
			if(dist<nearestDist){
				nearestTyphoon = tempEnemy;
				nearestDist = dist;
			}
		}

		if(typeof nearestTyphoon === 'object')
			return {target:nearestTyphoon,distance:nearestDist};
		else 
			return null;
	};
	
	return Enemy;
});