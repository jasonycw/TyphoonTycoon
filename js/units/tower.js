// defines your module and loads any dependencies
define([
	'Utility',
	'units/unit',
	'stage',
	'underscore'
], function(Utility,Unit,Stage,_) {

	console.log("tower.js loaded");

	//Create Tower Object and its constructor
	function Tower(startX,startY,spriteSrc){
		//call super constructor.
		Unit.call(this,startX,startY,spriteSrc);

		//Auto add to stage
		this.id = Stage.addChild(this,'towers');
		//var nearEnemy = this.findNearestEnemy();
		//nearEnemy.setMotion(0,0);
	}
	//subclass extends superclass
	Tower.prototype = Object.create(Unit.prototype);
	Tower.prototype.constructor = Tower;


	// tick event handler
	Tower.prototype.tick = function(dt){	// override
		//empty		
	};
	/**
	 * finds the enemy closest in distance
	 * @return {targetEnemy,distance} the enemy that is nearest
	 * @returns {undefined} if no enemy is alive
	 */
	
	Tower.prototype.findNearestEnemy = function(){
		// console.log("1");
		var nearestEnemy=null;
		var nearestDist = 10000000;
		// console.log(nearestDist);
		var tempEnemy	// reused variable
		var dist;		// reused variable
		for(var i=0; i <Stage.displayList['typhoons'].length; i++){
			if(!Stage.displayList['typhoons'][i])continue;
			
			tempEnemy = Stage.displayList['typhoons'][i];
			dist = Utility.pointDistance(	this.x,this.y,
											tempEnemy.x,tempEnemy.y);
			
			if(dist<nearestDist){
				nearestEnemy = tempEnemy;
				nearestDist = dist;
			}
		}
		if(typeof nearestEnemy === 'object')
			return {targetEnemy:nearestEnemy,distance:nearestDist};
		else 
			return null;
	};
	

	return Tower;
});