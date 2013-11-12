// defines your module and loads any dependencies
define([
	'units/unit',
	'stage',
	'utility'
], function(Unit,Stage,Utility)
{
	console.log("enemy.js loaded");
	// encapsulated in a Module Class / Function
	// to enable instantiation
	var Enemy = Unit.extend({	// TODO: rename it back to Typhoon when Earthquake is created
		direction:0,
		speed:0,
		force:{dir:0,mag:0},
		//constructor
		init:function(startX,startY,spriteSrc){
			//parent constructor
			this._super(startX,startY,spriteSrc);
			this.direction=0;
			this.speed=0;
			this.force = {dir:0,mag:0};
			Stage.addChild(this,'typhoons');
		},
		// tick event handler
		tick:function(){	// override
			this.updatePosition();
		},
		updatePosition:function(){
			// force -> velocity
			if(this.force.mag!=0){
				this.addMotion(this.force.dir,this.force.mag);
			}
			// velocity -> displacement
			var addX = Math.cos(this.direction/180*Math.PI) * this.speed;
			var addY = Math.sin(this.direction/180*Math.PI) * this.speed;
			this.x +=addX;
			this.y +=addY;

		},
		/**
		 *	getMotion()
		 *
		 *	returns an object {dir,sp} containing the direction and speed
		 */
		getMotion:function(){
			return {
				dir:this.direction,
				sp:this.speed
			};
		},
		/**
		 *	setMotion(new_direction, new_speed)
		 *	sets the motion of the typhoon, ignoring previous values
		 *
		 */
		setMotion:function(dir,sp){
			this.direction = dir;
			this.speed = sp;
		},
		/**
		 *	addMotion(force_dir, force_magnitude)
		 *
		 *	Call this function every tick to update the motion of a typhoon
		 */
		addMotion:function(force_dir,force_magnitude){
			newVelo = Utility.vectorSum({dir:this.direction,mag:this.speed},
										{dir:force_dir,mag:force_magnitude});
			this.direction  = newVelo.dir;
			this.speed 		= newVelo.mag;
		},
		/**
		 *	getForce()
		 *
		 *	returns an object {dir,mag} containing the direction and speed of the force
		 */
		getForce:function(){
			return this.force;
		},
		/**
		 *	setForce(force)
		 *	
		 *	sets the motion of the typhoon, ignoring previous values
		 *
		 */
		setForce:function(force){
			this.force = force;
		},
		/**
		 *	addForce(force_dir, force_magnitude)
		 *
		 *	takes a force object {dir,mag}
		 *	Modifies the current force object
		 */
		addForce:function(force){
			this.force = Utility.vectorSum(this.force,force);
		}

		
	});

	return Enemy;
})