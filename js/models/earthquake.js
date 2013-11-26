// defines your module and loads any dependencies
define([
	'stage',
	'models/buildEffect',
	'config',
	'utility'
], function(Stage, BuildEffect, Config, Utility) {

	console.log("earthquake.js loaded");
	/*
		Create Object and Constructor
		https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
	 */
	function Earthquake(x,y){
			// console.log("Unit Constructor is called");	//debug: did all the constructors call correctly?
			
			/*
				Initialion - all variable/funciton must have "this." before
				Use "var" to change the variable/funciton become private 
	  			"x || 0" just means "if there is a value for x, use that. Otherwise use 0."
			 */
			//Effect.call();
			this.x = x || 0;
			this.y = y || 0;
			this.effectColor = Config.earthquake.effectColor;
			this.duration = Config.earthquake.duration;
			this.totalDuration = Config.earthquake.duration;
			this.initDuration = Config.earthquake.duration;
			this.radius = Config.earthquake.radius;
			this.lineWidth = Config.earthquake.lineWidth;
			this.id = Stage.addChild(this,'effects');
			//console.log('id:', this.id);
			this.cycle = Config.earthquake.cycle || 2;
			this.xArray = [];
			this.yArray = [];
			this.buildEffect = [];
			this.init();
	};

	// Earthquake.prototype = Object.create(Effect.prototype);
	// Earthquake.prototype.constructor = Earthquake;

	Earthquake.prototype.init = function(){
			for (var i = 3 - 1; i >= 0; i--) {
				this.xArray.push( this.x + Math.random()* Config.earthquake.affectRadius );						
				this.yArray.push( this.y + Math.random()* Config.earthquake.affectRadius );										
			}
	};

	// tick event handler
	Earthquake.prototype.tick = function(dt){
		//console.log('tick Earthquake ', this.duration, this.cycle, dt);

		this.duration--;
		if(this.duration == 0){
			for (var i = 3 - 1; i >= 0; i--) {
				//console.log(this.xArray, this.yArray, BuildEffect);
				this.buildEffect.push(new BuildEffect(this.xArray[i], this.yArray[i], this.effectColor, this.radius, this.initDuration, this.lineWidth));
				this.damageNearBuilding(this.xArray[i], this.yArray[i]);
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

	Earthquake.prototype.damageNearBuilding = function( tx, ty ){

		for(var t in Stage.displayList['towers']){	//TODO don't use for in
			
			tempBuilding = Stage.displayList['towers'][t];
			dist = Utility.pointDistance( tx, ty, tempBuilding.x, tempBuilding.y);
			if( dist < this.radius){
				//course damge 
				console.log('affect:'+ tempBuilding.id );
			}//End if
		}//End for
	};

	return Earthquake;
});