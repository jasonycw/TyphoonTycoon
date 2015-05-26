// defines your module and loads any dependencies
define([
	'stage'
], function(Stage) {

	/*
		Create Object and Constructor
		https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
	 */
	function Effect() {

		/*
			Initialion - all variable/funciton must have "this." before
			Use "var" to change the variable/funciton become private 
  			"x || 0" just means "if there is a value for x, use that. Otherwise use 0."
		 */
		this.id = Stage.addChild(this, 'effects');

	};

	// tick event handler
	Effect.prototype.tick = function(dt) {
		// empty
	};

	Effect.prototype.render = function(ctx) {
		//to be overridden
		// if(this.spriteReady){
		// 	ctx.moveTo(startX,startY);
		// 	ctx.lineTo(endX,endY);
		// 	ctx.stroke();
		// }

	};
	/**
	 * remove the Effect, without death effect
	 */
	Effect.prototype.remove = function() {
		// to be overridden
	}

	return Effect;
});