// defines your module and loads any dependencies
define([
	'units/unit',
], function(Unit)
{
	console.log("tower.js loaded");
	// encapsulated in a Module Class / Function
	// to enable instantiation
	var Tower = Unit.extend({
		//constructor
		init:function(startX,startY,spriteSrc){
			//parent constructor
			this._super(startX,startY,spriteSrc);
		},
		// tick event handler
		tick:function(){	// override
			
		},
		
	});

	return Tower;
})