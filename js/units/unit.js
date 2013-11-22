// defines your module and loads any dependencies
define([
	'stage'
], function(Stage) {

	console.log("unit.js loaded");
	/*
		Create Object and Constructor
		https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
	 */
	function Unit(startX,startY,spriteSrc){
			//console.log("Unit Constructor is called");	//debug: did all the constructors call correctly?
			
			/*
				Initialion - all variable/funciton must have "this." before
				Use "var" to change the variable/funciton become private 
	  			"x || 0" just means "if there is a value for x, use that. Otherwise use 0."
			 */
			this.x = startX || 0;
			this.y = startY || 0;
			// prepare sprite
			this.sprite = new Image();
			this.sprite.src = spriteSrc;
			this.spriteOrigin = {x:0,y:0};
			this.spriteReady=false;

			// update sprite origin according to sprite size
			var that = this;
			this.sprite.onload = function(){
				that.spriteOrigin = {x:that.sprite.width/2, y:that.sprite.height/2};
				that.spriteReady=true;
			};
	};

	// tick event handler
	Unit.prototype.tick = function(dt){
		// empty
	};

	Unit.prototype.render = function(ctx){
		if(this.spriteReady){
			//draw image
			var drawX = this.x - this.spriteOrigin.x;
			var drawY = this.y - this.spriteOrigin.y;
			ctx.drawImage(this.sprite,drawX,drawY);
		}

	};
	/**
	 * remove the unit, without death effect
	 */
	Unit.prototype.remove = function(){
		// to be overridden
	}
	/**
	 * Check if at least part of the unit is within the canvas
	 * @return {Boolean} Whether it is within the canvas
	 */
	Unit.prototype.isWithinCanvas = function(){

		var drawX = this.x - this.spriteOrigin.x;
		var drawY = this.y - this.spriteOrigin.y;
		return 	(0 <=drawX + this.sprite.width) &&(drawX<= Stage.width)&&
				(0<=drawY + this.sprite.height)&&(drawY<= Stage.height);
	}

	Unit.prototype.drawRotatedImage = function(context, image, x, y, angle) { 

		// save the current co-ordinate system 
		// before we screw with it
		context.save(); 

		// move to the middle of where we want to draw our image
		context.translate(x, y);

		// rotate around that point, converting our 
		// angle from degrees to radians 
		context.rotate(angle * (Math.PI/180));

		// draw it up and to the left by half the width
		// and height of the image 
		context.drawImage(image, -(image.width/2), -(image.height/2));

		// and restore the co-ords to how they were when we began
		context.restore(); 
	}

	return Unit;
});