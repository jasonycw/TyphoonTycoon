// defines your module and loads any dependencies
define([
	'units/unit',
	'stage'
], function(Unit,Stage) {

	console.log("tower.js loaded");

	//Create Tower Object and its constructor
	function Tower(startX,startY,spriteSrc){
		//call super constructor.
		Unit.call(this,startX,startY,spriteSrc);

		//Auto add to stage
		this.id = Stage.addChild(this,'towers');
	}
	//subclass extends superclass
	Tower.prototype = Object.create(Unit.prototype);
	Tower.prototype.constructor = Tower;


	// tick event handler
	Tower.prototype.tick = function(){	// override

	};

	return Tower;
})