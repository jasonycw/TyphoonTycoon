define([
	'stage',
	'models/buildEffect',
	'config',
	'utility'
], function(Stage, Ripple, Config, Utility) {
	/*
		Create Object and Constructor
		https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
	 */
	function EarthquakeEffect(x, y, opt) {
		/*
			Initialion - all variable/funciton must have "this." before
			Use "var" to change the variable/funciton become private 
  			"x || 0" just means "if there is a value for x, use that. Otherwise use 0."
		 */
		opt = opt || {};
		this.x = x || 0;
		this.y = y || 0;

		this.effectColor = "silver";
        if (opt.hasOwnProperty("effectColor")) {
			this.effectColor = opt.effectColor;
		}
		this.radius = 40;
        if (opt.hasOwnProperty("radius")) {
        	this.radius = opt.radius;
        }
		this.lineWidth = Config.earthquake.lineWidth;
		this.id = Stage.addChild(this, 'effects');
		this.cycle = Config.earthquake.cycle || 2;
		this.xArray = [];
		this.yArray = [];
		this.buildEffect = [];
		this.init();
	};


	EarthquakeEffect.prototype.init = function() {
		for (var i = 3 - 1; i >= 0; i--) {
			this.xArray.push(this.x + Math.random() * Config.earthquake.affectRadius);
			this.yArray.push(this.y + Math.random() * Config.earthquake.affectRadius);
		}
	};

	// tick event handler
	EarthquakeEffect.prototype.tick = function(dt) {
		this.delay-=dt;
		if (this.delay <= 0) {
			this.remove();
		} //End if
	};

	EarthquakeEffect.prototype.render = function(ctx) {
		ctx.fillStyle = "#FFFFFF";
		ctx.fillText('EarthquakeEffect', this.x, this.y + 20);
		this.drawRange(ctx);
	};

	/**
	 * remove the unit, without death effect
	 */
	EarthquakeEffect.prototype.remove = function() {
		Stage.removeChild(this.id, 'effects');
	};

	EarthquakeEffect.prototype.setIndex = function(index) {
		this.effectIndex = index;
	};

	EarthquakeEffect.prototype.drawRange = function(ctx){
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		ctx.fillStyle = "white";
		ctx.globalAlpha = 0.2;
		ctx.fill();
		ctx.globalAlpha = 1;
	};

	EarthquakeEffect.prototype.damageNearBuilding = function(tx, ty) {
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

	return EarthquakeEffect;
});