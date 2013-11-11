// defines your module and loads any dependencies
define([
	'../class',
	'../stage'
], function(Class,Stage)
{
	console.log("unit.js loaded");
	stage = Stage;
	// encapsulated in a Module Class / Function
	// to enable instantiation
	
	var Unit = Class.extend({
		x: 				0,
		y: 				0,
		sprite:			"",// HTML5 Image
		sprite_origin: 	{x:0,y:0},
		
		//constructor
		init:function(startX,startY,spriteSrc){
			// init x,y
			this.x = startX;
			this.y = startY;
			// prepare sprite
			this.sprite = new Image();
			this.sprite.src = spriteSrc;
			// update sprite origin according to sprite size
			var that = this;
			this.sprite.onload = function(){
				that.sprite_origin = {x:that.sprite.width/2, y:that.sprite.height/2};
				that.draw();
			};
		},
		// tick event handler
		tick:function(){
			// empty
		},
		draw:function(){
			var drawX = this.x - this.sprite_origin.x;
			var drawY = this.y - this.sprite_origin.y;
			stage.ctx.drawImage(this.sprite,drawX,drawY);
		}
	});

	return Unit;
})