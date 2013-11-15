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
			 */
			this.x = startX;
			this.y = startY;
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
	Unit.prototype.tick = function(){
		// empty
	};

	Unit.prototype.render = function(ctx){
		if(this.spriteReady){
			//call tick function before rendering
			this.tick();
			//draw image
			var drawX = this.x - this.spriteOrigin.x;
			var drawY = this.y - this.spriteOrigin.y;
			ctx.drawImage(this.sprite,drawX,drawY);
		}

	};

	return Unit;
})