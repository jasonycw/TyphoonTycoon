define([
	'Utility',
	'units/unit',
	'stage'
], function(Utility, Unit, Stage) {
	// Create Tower Object and its constructor
	function Tower(startX, startY, spriteSrc) {
		//call super constructor.
		Unit.call(this, startX, startY, spriteSrc);

		//Auto add to stage
		this.id = Stage.addChild(this, 'towers');
		//var nearEnemy = this.findNearestEnemy();
		//nearEnemy.setMotion(0,0);
	}
	//subclass extends superclass
	Tower.prototype = Object.create(Unit.prototype);
	Tower.prototype.constructor = Tower;


	// tick event handler
	Tower.prototype.tick = function(dt) { // override
		//empty		
	};
	/**
	 * finds the enemy closest in distance
	 * @return {target,distance} the enemy that is nearest
	 * @returns {undefined} if no enemy is alive
	 */

	Tower.prototype.findNearestEnemy = function() {
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
	Tower.prototype.findNearestEnemyWithin = function(rng) {
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

	Tower.prototype.render = function(ctx) {
		Unit.prototype.render.call(this, ctx);
	};

	/**
	 * remove the unit, without death effect
	 */
	Tower.prototype.remove = function() {
		Stage.removeChild(this.id, 'towers');
	}

	return Tower;
});