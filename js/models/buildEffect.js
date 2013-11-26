// defines your module and loads any dependencies
define([
	'stage',
	'models/effect'
], function(Stage, Effect) {

	console.log("buildEffect.js loaded");
	/*
		Create Object and Constructor
		https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
	 */
	function BuildEffect(x, y, buildEffectColor, duration, radius, lineWidth) {
		//console.log("Unit Constructor is called");	//debug: did all the constructors call correctly?

		/*
				Initialion - all variable/funciton must have "this." before
				Use "var" to change the variable/funciton become private 
	  			"x || 0" just means "if there is a value for x, use that. Otherwise use 0."
			 */
		Effect.call();
		this.x = x || 0;
		this.y = y || 0;
		this.buildEffectColor = buildEffectColor;
		this.duration = duration;
		this.totalDuration = duration;
		this.radius = radius;
		this.lineWidth = lineWidth;
		this.id = Stage.addChild(this, 'effects');
		// console.log(this.x,this.y);

		// update sprite origin according to sprite size
	};

	BuildEffect.prototype = Object.create(Effect.prototype);
	BuildEffect.prototype.constructor = BuildEffect;

	// tick event handler
	BuildEffect.prototype.tick = function(dt) {
		this.duration--;
		if (!this.duration) this.remove();
	};

	BuildEffect.prototype.render = function(ctx) {
		// console.log('render BuildEffect ' + this.x+', '+this.y);
		var relativeTime = Math.sin(Math.PI * (this.duration / this.totalDuration));
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius * ((this.totalDuration - this.duration) / this.totalDuration), 0, 2 * Math.PI);
		ctx.strokeStyle = this.buildEffectColor;
		ctx.globalAlpha = relativeTime * 0.8;
		ctx.lineWidth = this.lineWidth * relativeTime;
		ctx.stroke();
		ctx.globalAlpha = 1;
	};
	/**
	 * remove the unit, without death effect
	 */
	BuildEffect.prototype.remove = function() {
		Stage.removeChild(this.id, 'effects');
	};

	BuildEffect.prototype.setIndex = function(index) {
		this.effectIndex = index;
	};

	return BuildEffect;
});