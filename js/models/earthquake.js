// defines your module and loads any dependencies
define([
	'stage',
	'models/buildEffect'
], function(Stage, BuildEffect) {

	console.log("earthquake.js loaded");
	/*
		Create Object and Constructor
		https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
	 */
	function Earthquake(x,y,effectColor,radius,lineWidth,duration,cycle){
			// console.log("Unit Constructor is called");	//debug: did all the constructors call correctly?
			
			/*
				Initialion - all variable/funciton must have "this." before
				Use "var" to change the variable/funciton become private 
	  			"x || 0" just means "if there is a value for x, use that. Otherwise use 0."
			 */
			//Effect.call();
			this.x = x || 0;
			this.y = y || 0;
			this.effectColor = effectColor;
			this.duration = duration;
			this.totalDuration = duration;
			this.initDuration = duration;
			this.radius = radius;
			this.lineWidth = lineWidth;
			this.id = Stage.addChild(this,'effects');
			//console.log('id:', this.id);
			this.cycle = cycle || 2;
			this.xArray = [];
			this.yArray = [];
			this.buildEffect = [];
			this.init();
	};

	// Earthquake.prototype = Object.create(Effect.prototype);
	// Earthquake.prototype.constructor = Earthquake;

	Earthquake.prototype.init = function(){
			for (var i = 3 - 1; i >= 0; i--) {
				this.xArray.push( this.x + Math.random()* 40 );						
				this.yArray.push( this.y + Math.random()* 40 );										
			}
	};

	// tick event handler
	Earthquake.prototype.tick = function(dt){
		console.log('tick Earthquake ', this.duration, this.cycle, dt);

		this.duration--;
		if(this.duration == 0){
			for (var i = 3 - 1; i >= 0; i--) {
				//console.log(this.xArray, this.yArray, BuildEffect);
				this.buildEffect.push(new BuildEffect(this.xArray[i], this.yArray[i], "red", 40, 40, 3));
			}	
			this.cycle--;
			this.duration = this.initDuration;
			if(this.cycle == 0){
				this.remove();
			}//End if
		}//End if
	};

	Earthquake.prototype.render = function(ctx){
		 // console.log('render Earthquake ' + this.x+', '+this.y);
	};

	/**
	 * remove the unit, without death effect
	 */
	Earthquake.prototype.remove = function(){
		// console.log('remove:' + this.id);
		Stage.removeChild(this.id,'effects');
	};

	Earthquake.prototype.setIndex = function(index){
		this.effectIndex = index;
	};

	return Earthquake;
});