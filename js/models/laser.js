// defines your module and loads any dependencies
define([
	'stage',
	'models/effect'
], function(Stage, Effect) {

	console.log("laser.js loaded");
	/*
		Create Object and Constructor
		https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
	 */
	function Laser(startX,startY,endX,endY,laserColor,duration,lineWidth){
			//console.log("Unit Constructor is called");	//debug: did all the constructors call correctly?
			
			/*
				Initialion - all variable/funciton must have "this." before
				Use "var" to change the variable/funciton become private 
	  			"x || 0" just means "if there is a value for x, use that. Otherwise use 0."
			 */
			//Effect.call();
			this.startX = startX || 0;
			this.startY = startY || 0;
			this.endX = endX || 0;
			this.endY = endY || 0;
			this.laserColor = laserColor;
			this.duration = duration;
			this.lineWidth = lineWidth;
			this.id = Stage.addChild(this,'effects');
			// console.log(this.startX,this.startY);

			// update sprite origin according to sprite size
	};

	Laser.prototype = Object.create(Effect.prototype);
	Laser.prototype.constructor = Laser;

	// tick event handler
	Laser.prototype.tick = function(dt){
		// empty
		this.duration--;
		if(!this.duration)this.remove();
	};

	Laser.prototype.render = function(ctx){
		// console.log('render laser ' + this.startX+', '+this.startY);
		ctx.beginPath();
		ctx.moveTo(this.startX,this.startY);
		ctx.lineTo(this.endX,this.endY);
		ctx.lineCap = 'round';
		ctx.lineJoin = 'miter';
		ctx.strokeStyle=this.laserColor;
		ctx.lineWidth = this.lineWidth;
		ctx.stroke();
		
	};
	/**
	 * remove the unit, without death effect
	 */
	Laser.prototype.remove = function(){
		// to be overridden
		Stage.removeChild(this.id,'effects');
	}

	Laser.prototype.setIndex = function(index){
		that.effectIndex = index;
	}

	return Laser;
});