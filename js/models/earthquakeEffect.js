define([
	'stage',
	'models/buildEffect',
	'config',
	'utility'
], function(Stage, Ripple, Config, Utility)
{
	/*
		Create Object and Constructor
		https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
	 */
	function EarthquakeEffect(x, y, opt)
	{
		/*
			Initialion - all variable/funciton must have "this." before
			Use "var" to change the variable/funciton become private
  			"x || 0" just means "if there is a value for x, use that. Otherwise use 0."
		 */
		opt = opt ||
		{};
		this.x = x || 0;
		this.y = y || 0;

		this.effectColor =
			Config.earthquake.effect.color || "silver";

		this.radius = Config.earthquake.radius || 40

		this.lineWidth = Config.earthquake.effect.lineWidth;

		this.rate = Config.earthquake.effect.rate;
		this.elapsedTime = this.rate; // start immediately

		// count down for removing the effect
		this.lifetime = 0;
		this.duration = Config.earthquake.effect.duration;
		this.amplitude = Config.earthquake.effect.amplitude;

		this.id = Stage.addChild(this, 'effects');
	};


	// tick event handler
	EarthquakeEffect.prototype.tick = function(dt)
	{
		this.lifetime += dt;
		if (this.lifetime >= this.duration)
		{
			this.remove();
		}
		this.elapsedTime += dt;
		if (this.elapsedTime >= this.rate)
		{
			4
			new Ripple(
				this.x,
				this.y - (this.amplitude * (1 - this.lifetime / this.duration)),
				this.effectColor,
				1, this.radius, 3);
			this.elapsedTime -= this.rate;
		}

	}; //(this.amplitude * Math.sin(Math.PI * this.lifetime /this.duration)

	EarthquakeEffect.prototype.render = function(ctx)
	{
		//ctx.fillStyle = "#FFFFFF";
		//ctx.fillText('EarthquakeEffect', this.x, this.y + 20);
	};

	/**
	 * remove the unit, without death effect
	 */
	EarthquakeEffect.prototype.remove = function()
	{
		Stage.removeChild(this.id, 'effects');
	};

	EarthquakeEffect.prototype.setIndex = function(index)
	{
		this.effectIndex = index;
	};


	return EarthquakeEffect;
});
