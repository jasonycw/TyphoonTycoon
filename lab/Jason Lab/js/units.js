function Unit(coordinateX,coordinateY,spriteSrc){
	that = this;
	this.x = coordinateX;
	this.y = coordinateY;
	this.lastX = this.x;
	this.lastY = this.y;

	this.sprite = new Image();
	this.sprite.src = spriteSrc;
	this.sprite_origin = {x:this.sprite.width/2, y:this.sprite.height/2};

	unit_list.push(this);
	
	this.sprite.onload = function(){
		that.sprite_origin = {x:that.sprite.width/2, y:that.sprite.height/2};
		that.draw();
	};

	this.draw = function(){
		var drawX = this.x - this.sprite_origin.x;
		var drawY = this.y - this.sprite_origin.y;
		ctx.drawImage(this.sprite,drawX,drawY);
	}

	this.setOrigin = function(xx,yy){
		this.sprite_origin = {x:xx,y:yy};
	}
}


var p = Unit.prototype;



