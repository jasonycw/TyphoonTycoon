// defines your module and loads any dependencies
define([
	'stage',
	'models/effect',
	'config'
], function(Stage, Effect, Config) {

	console.log("hkCircle.js loaded");
	/*
		Create Object and Constructor
		https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
	 */
	function HKCircle(){
			/*
				Initialion - all variable/funciton must have "this." before
				Use "var" to change the variable/funciton become private 
	  			"x || 0" just means "if there is a value for x, use that. Otherwise use 0."
			 */
			Effect.call();
			this.x = Config.hkArea.x || 0;
			this.y = Config.hkArea.y || 0;
			this.radius = Config.hkArea.radius;
			this.lineWidth = Config.hkArea.lineWidth;
			this.id = Stage.addChild(this,'effects');
			
			// this.duration = Config.hkArea.cycleDuration;
			// this.totalDuration = Config.hkArea.cycleDuration;

	};

	HKCircle.prototype = Object.create(Effect.prototype);
	HKCircle.prototype.constructor = HKCircle;

	// tick event handler
	HKCircle.prototype.tick = function(dt){
		// this.duration--;
		// if(!this.duration) 
		// 	this.duration = Config.hkArea.cycleDuration;
	};

	HKCircle.prototype.render = function(ctx){

		// var relativeTime = Math.sin(Math.PI*(this.duration/this.totalDuration));
		// ctx.beginPath();
		// ctx.arc(this.x,this.y,this.radius*((this.totalDuration-this.duration)/this.totalDuration),0,2*Math.PI);
		// ctx.fillStyle= "rgba(200, 255, 0, relativeTime*0.8)";
		// ctx.fill();

		//Inner Circle 
		ctx.beginPath();
		ctx.arc(this.x,this.y,this.radius,0,2*Math.PI);
		ctx.fillStyle = Config.hkArea.fillStyle;
		ctx.fill();

		//Outer Circle 
		ctx.beginPath();
		ctx.arc(this.x,this.y,this.radius*3,0,2*Math.PI);
		ctx.fillStyle = Config.hkArea.fillStyle;
		ctx.fill();

	};
	/**
	 * remove the unit, without death effect
	 */
	HKCircle.prototype.remove = function(){
		// Stage.removeChild(this.id,'effects');
	};

	HKCircle.prototype.setIndex = function(index){
		this.effectIndex = index;
	};

	return HKCircle;
});