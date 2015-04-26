define([
	'utility',
	'units/structure',
	'stage',
	'config'
], function(Utility, Structure, Stage, Config) {
	// Create Tower Object and its constructor
	function Tower(startX, startY, spriteSrc, game, name) {
		//call super constructor.
		name = name || "Tower";
		Structure.call(this, startX, startY, spriteSrc, game, name);
	}
	//subclass extends superclass
	Tower.prototype = Object.create(Structure.prototype);
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

	return Tower;
});
