define([
	'stage',
	'models/buildEffect',
	'config',
	'utility'
], function(Stage, BuildEffect, Config, Utility) {
	/*
		Create Object and Constructor
		https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
	 */
	/**
	 * Creates a new Toast object
	 * @param {number} x               x position realtive to the stage
	 * @param {number} y               y position realtive to the stage
	 * @param {string} msg             the message to show
	 * @param {dir:number, 
	 *         time:number, 
	 *         dist:number, 
	 *         speed:number}    moving moving information. can omit one of {time,dist,speed}
	 * @param {fontSize:string} style  styling for the message
	 */
	function Toast(x, y, msg, moving, style) {
		/*
			Initialion - all variable/funciton must have "this." before
			Use "var" to change the variable/funciton become private 
  			"x || 0" just means "if there is a value for x, use that. Otherwise use 0."
		 */
		this.x = x || 0;
		this.y = y || 0;
		this.setStyle(style);
		this.setMoving(moving);
		this.fontSize = "10px";
		this.fontFamily = "Arial";
		this.moveDir = 90; // degree
		this.moveTime = 2; // second
		this.moveDist = 20; //px
		this.moveSpeed = this.moveDist / this.moveTime;
		this.init();
	};

	Toast.prototype.setMoving = function(moving){
		this.moveDir = moving.dir || 90;
		if(moving.hasOwnProperty() && moving.hasOwnProperty()){

		}else if(moving.hasOwnProperty() && moving.hasOwnProperty()){

		}else if(moving.hasOwnProperty() && moving.hasOwnProperty()){

		}else{
			throw "must have 2 of {time,dist,speed} to calculate time and moving";
		}
		this.moveTime = 2; // second
		this.moveDist = 20; //px
		this.moveSpeed = moving.dir; // degree
	};


	Toast.prototype.init = function() {
	};

	// tick event handler
	Toast.prototype.tick = function(dt) {
		this.duration--;
		if (this.duration == 0) {
			for (var i = 3 - 1; i >= 0; i--) {
				this.buildEffect.push(new BuildEffect(this.xArray[i], this.yArray[i], this.effectColor, this.radius, this.initDuration, this.lineWidth));
				this.damageNearBuilding(this.xArray[i], this.yArray[i]);
			}
			this.cycle--;
			this.duration = this.initDuration;
			if (this.cycle == 0) {
				this.remove();
			} //End if
		} //End if
	};

	Toast.prototype.render = function(ctx) {
		ctx.font = ""+ this.fontSize+" "+this.fontFamily;
		ctx.fillStyle = "#FFFFFF";
		ctx.fillText('Toast', this.x, this.y);
	};

	/**
	 * remove the unit, without death effect
	 */
	Toast.prototype.remove = function() {
		Stage.removeChild(this.id, 'effects');
	};

	Toast.prototype.setIndex = function(index) {
		this.effectIndex = index;
	};

	Toast.prototype.damageNearBuilding = function(tx, ty) {
		for (var t in Stage.displayList['structures']) { //TODO don't use for in

			tempBuilding = Stage.displayList['structures'][t];
			dist = Utility.pointDistance(tx, ty, tempBuilding.x, tempBuilding.y);
			if (dist < this.radius) {
				tempBuilding.remove();

				// cause damge 
				Stage.removeChild(tempBuilding.id, 'structures');
			} //End if
		} //End for
	};

	return Toast;
});