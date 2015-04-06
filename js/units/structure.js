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
	 * finds the enemy closest in distance
	 * @return {target,distance} the enemy that is nearest
	 * @returns {undefined} if no enemy is alive
	 */

	Structure.prototype.findNearestEnemy = function() {
		var nearestEnemy = null;
		var nearestDist = 10000000;
		var tempEnemy // reused variable
		var dist; // reused variable
		for (var t in Stage.displayList['typhoons']) { //TODO don't use for in

			tempEnemy = Stage.displayList['typhoons'][t];
			dist = Utility.pointDistance(this.x, this.y,
				tempEnemy.x, tempEnemy.y);

			if (dist < nearestDist) {
				nearestEnemy = tempEnemy;
				nearestDist = dist;
			}
		}

		if (typeof nearestEnemy === 'object')
			return {
				target: nearestEnemy,
				distance: nearestDist
			};
		else
			return null;
	};
	Structure.prototype.findNearestEnemyWithin = function(rng) {
		var nearestEnemy = null;
		var nearestDist = 10000000;
		var tempEnemy // reused variable
		var dist; // reused variable
		for (var t in Stage.displayList['typhoons']) {
			tempEnemy = Stage.displayList['typhoons'][t];
			// prune the enemies definitely out of range
			if (Math.abs(this.x - tempEnemy.x) > rng || Math.abs(this.y - tempEnemy.y) > rng)
				continue;
			dist = Utility.pointDistance(this.x, this.y,
				tempEnemy.x, tempEnemy.y);
			if (dist <= rng) //&&, js have no short-circuit
				if (dist < nearestDist) {
					nearestEnemy = tempEnemy;
					nearestDist = dist;
				}
		}

		if (typeof nearestEnemy === 'object')
			return {
				target: nearestEnemy,
				distance: nearestDist
			};
		else
			return null;
	};

	Structure.prototype.render = function(ctx) {
		Unit.prototype.render.call(this, ctx);
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
