// defines your module and loads any dependencies
define([
	'stage',
	'models/effect',
	'config',
	'utility',
	'models/ui'
], function(Stage, Effect, Config, Utility, UI) {

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
			this.hsiInterest = 0;
			// this.duration = Config.hkArea.cycleDuration;
			// this.totalDuration = Config.hkArea.cycleDuration;
			//this.totalDt = 0;
	};

	HKCircle.prototype = Object.create(Effect.prototype);
	HKCircle.prototype.constructor = HKCircle;

	// tick event handler
	HKCircle.prototype.tick = function(dt){

		// this.totalDt+=dt;
		// if(Math.round(this.totalDt)%2 == 0) {
			//TODO change to at time intervew
			this.hsiInterest += Math.ceil(dt);

			//check any typhoon within the circle
			//TODO could be optimize
			for (var i = Stage.displayList['typhoons'].length - 1; i >= 0; i--) {
				var e = Stage.displayList['typhoons'][i];
				var distance;
				try{
					distance = Utility.pointDistance(this.x, this.y, e.x, e.y);
				} catch(err){}
				finally{
					if( distance!=NaN ){
						if( distance > this.radius &&  distance <= this.radius*3){
							this.hsiInterest -= Math.ceil(dt)*10;	
							//TODO warning
						}
						else if (distance < this.radius )
						{
							this.hsiInterest -= Math.ceil(dt)*this.hsiInterest*100;	
						}//End if 
					}//End if

				}//End try..finally
			} //End for

			// this.hsiInterest = Math.round(this.hsiInterest);
			console.log (this.hsiInterest);
			//TODO static the HSI ???
			
			//this.gameUI.setHSI( this.hsiInterest + this.gameUI.getHSI() );
		//}
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