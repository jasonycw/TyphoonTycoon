// defines your module and loads any dependencies
define([
	'unit',
], function(Unit)
{
	console.log("enemy.js loaded");
	// encapsulated in a Module Class / Function
	// to enable instantiation
	var Enemy = Unit.extend({
		x: 0,
		y: 0,
		sprite:"",
		sprite_origin:{x:0,y:0},
		//constructor
		init:function(startX,startY,spriteSrc){
			//parent constructor
			this._super(startX,startY,spriteSrc);
		},
		// tick event handler
		tick:function(){	// override
			
		},
		
	});

	return Enemy;
})