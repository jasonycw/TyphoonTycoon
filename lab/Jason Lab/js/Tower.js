function Tower(coordinateX,coordinateY,imageSrc){
	var that = this;
	this.x = coordinateX;
	this.y = coordinateY;
	this.image = new Image();
	this.image.src = imageSrc;
	this.origin = {x:this.image.width/2, y:this.image.height/2};
	
	this.image.onload = function(){
		that.origin.x = that.image.width/2;
		that.origin.y = that.image.height/2;
		var atX = that.x - that.origin.x;
		var atY = that.y - that.origin.y;
		ctx.drawImage(that.image,atX,atY);
		console.log("Tower is built at [ "+atX+" , "+atY+" ]");
	};

	tower_list.push(this);
}

var twr = Tower.prototype;// = new Unit();

twr.draw = function(){
	this.origin.x = this.image.width/2;
	this.origin.y = this.image.height/2;
	var atX = this.x - this.origin.x;
	var atY = this.y - this.origin.y;
	ctx.drawImage(this.image,atX,atY);
}

