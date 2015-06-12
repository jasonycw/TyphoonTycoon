define([
	'stage',
	'models/buildEffect',
	'config',
	'utility',
	'models/earthquakeEffect',
	'models/signals/sigStructureKilled'
], function(Stage, Ripple, Config, Utility, Effect, SigStructureKilled)
{
	/*
		Create Object and Constructor
		https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
	 */
	function Earthquake(x, y)
	{
		/*
			Initialion - all variable/funciton must have "this." before
			Use "var" to change the variable/funciton become private
			"x || 0" just means "if there is a value for x, use that. Otherwise use 0."
		 */
		this.x = x || 0;
		this.y = y || 0;
		this.effectColor = Config.earthquake.effectColor;
		this.delay = Config.earthquake.delay;
		this.radius = Config.earthquake.radius;
		this.lineWidth = Config.earthquake.lineWidth;
		this.id = Stage.addChild(this, 'effects');
		this.cycle = Config.earthquake.cycle || 2;
	};



	// tick event handler
	Earthquake.prototype.tick = function(dt)
	{

		this.delay -= dt;
		if (this.delay <= 0)
		{
			this.damageNearBuilding(this.x, this.y);
			new Effect(this.x, this.y);
			this.remove();
		} //End if
	};

	Earthquake.prototype.render = function(ctx)
	{
		this.drawRange(ctx);
		ctx.fillStyle = "#FFFFFF";
		ctx.textAlign = 'center';
		ctx.fillText('Earthquake in: ' + Math.ceil(this.delay),
			this.x, this.y);
	};

	/**
	 * remove the unit, without death effect
	 */
	Earthquake.prototype.remove = function()
	{
		Stage.removeChild(this.id, 'effects');
	};

	Earthquake.prototype.setIndex = function(index)
	{
		this.effectIndex = index;
	};

	Earthquake.prototype.drawRange = function(ctx)
	{
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
		ctx.fillStyle = "red";
		ctx.globalAlpha = 0.2;
		ctx.fill();
		ctx.globalAlpha = 1;
	};

	Earthquake.prototype.damageNearBuilding = function(tx, ty)
	{
		for (var t in Stage.displayList['structures'])
		{ //TODO don't use for in

			tempBuilding = Stage.displayList['structures'][t];
			dist = Utility.pointDistance(tx, ty,
				tempBuilding.x, tempBuilding.y);
			if (dist < this.radius)
			{
				tempBuilding.remove();

				// cause damge
				Stage.removeChild(tempBuilding.id, 'structures');
				SigStructureKilled.get().dispatch();
			} //End if
		} //End for
	};

	return Earthquake;
});
