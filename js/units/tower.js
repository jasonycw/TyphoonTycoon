// defines your module and loads any dependencies
define([
	'units/unit',
	'stage'
], function(Unit,Stage) {
	console.log("tower.js loaded");
	// encapsulated in a Module Class / Function
	// to enable instantiation
	var Tower = Unit.extend({
		//constructor
		init:function(startX,startY,spriteSrc){
			//parent constructor

			this._super(startX,startY,spriteSrc);
			//console.log("1");	//debug: did all the constructors call correctly?
			//console.log(Stage);
			//this.TID = Stage.addTower(this); // D: i want it so badly~
		},
		// tick event handler
		tick:function(){	// override
			
		},
		
	});

	return Tower;
})