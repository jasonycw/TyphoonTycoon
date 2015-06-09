define([
	'utility',
	'units/structure',
	'stage',
	'config',
	'models/signals/sigGameReset'
], function(Utility, Structure, Stage, Config, SigGameReset) {
	// Create Tower Object and its constructor
	function Tower(startX, startY, spriteSrc, game, name) {
		//call super constructor.
		name = name || "Tower";

		this._isOnline = true;
		this.towerID = Tower.instanceList.length;
		Tower.instanceList.push(this);
		Structure.call(this, startX, startY, spriteSrc, game, name);

	}

	//subclass extends superclass
	Tower.prototype = Object.create(Structure.prototype);
	Tower.prototype.constructor = Tower;

	// static functions and variables
	Tower.instanceList = [];
	Tower.all = function(callback){
		for(var i=0; i < Tower.instanceList.length; i++){
            if(Tower.instanceList[i] != undefined &&
                Tower.instanceList[i] != null){
                    callback(Tower.instanceList[i]);
            }
		}
	};
	SigGameReset.get().add(function(){
        console.log("tower reset called");
		Tower.instanceList=[];
	});


	// tick event handler
	Tower.prototype.tick = function(dt) { // override
		//empty
	};
	/**
	 * finds the enemy closest in distance
	 * @return {target,distance} the enemy that is nearest
	 * @returns {undefined} if no enemy is alive
	 */
	Tower.prototype.isOnline = function(val){
		if(val === undefined){
			return this._isOnline;
		}else{
			this._isOnline = val;
		}
	};
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
	Tower.prototype.remove = function(){
		delete Tower.instanceList[this.towerID];
		// parent remove logic
		Structure.prototype.remove.call(this);
	};

	return Tower;
});
