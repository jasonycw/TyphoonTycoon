// defines your module and loads any dependencies
define([
	'units/unit',
], function(Unit)
{
	console.log("enemy.js loaded");
	// encapsulated in a Module Class / Function
	// to enable instantiation
	var Enemy = Unit.extend({
		direction:0,
		speed:0,
		//constructor
		init:function(startX,startY,spriteSrc){
			//parent constructor
			this._super(startX,startY,spriteSrc);
			this.direction=0;
			this.speed=0;
		},
		// tick event handler
		tick:function(){	// override
			
		},
		getMotion:function(){
			return {
				dir:this.direction,
				sp:this.speed
			};
		},
		setMotion:function(dir,sp){
			this.direction = dir;
			this.speed = sp;
		},
		addMotion:function(force_dir,force_magnitude){
			var ax,ay;
			var bx,by;
			var rx,ry;
			ax = Math.cos(this.direction/180*Math.PI) * this.speed;
			ay = Math.sin(this.direction/180*Math.PI) * this.speed;
			bx = Math.cos(force_dir		/180*Math.PI) * force_magnitude;
			by = Math.sin(force_dir		/180*Math.PI) * force_magnitude;
			rx = ax+bx;
			ry = ay+by;
			var newDir = Math.atan2(ry,rx)/Math.PI * 180;
			var newSp  = Math.sqrt(rx*rx + ry*ry);
			this.direction = newDir;
			this.speed = newSp;
		}
		
	});

	return Enemy;
})