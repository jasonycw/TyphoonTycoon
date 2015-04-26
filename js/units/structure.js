define([
	'utility',
	'units/unit',
	'stage',
	'config',
	'models/buildEffect'
], function(Utility, Unit, Stage, Config, BuildEffect) {
	// Create Tower Object and its constructor
	function Structure(startX, startY, spriteSrc, game, name) {
		name = name || "Structure";
		//call super constructor.
		Unit.call(this, startX, startY, spriteSrc, game, name);
		//Auto add to stage
		this.id = Stage.addChild(this, 'structures');
		this.onCreated();
	}
	//subclass extends superclass
	Structure.prototype = Object.create(Unit.prototype);
	Structure.prototype.constructor = Structure;


	Structure.prototype.onCreated = function(){
		this.game.addPower(this.config.power);
		var buildEffect = new BuildEffect(
			                              this.x, this.y, 
			                              this.config.buildEffectColor
			                              , 40, 40, 3);
	};
	// tick event handler
	Structure.prototype.tick = function(dt) { // override
		//empty		
	};

	/**
	 * remove the unit, without death effect
	 */
	Structure.prototype.remove = function() {
		Stage.removeChild(this.id, 'structures');
		console.log(this.name);
		// return the power it got
		this.game.reducePower(Config[this.name].power);
	}

	return Structure;
});
