function Tower(coordinateX,coordinateY,imageSrc){
	this.x = coordinateX;
	this.y = coordinateY;
	this.image = new Image();
	this.image.src = imageSrc;
	this.originX = this.image.height/2;
	this.originY = this.image.width/2;

	var atX = this.x - this.originX;
	var atY = this.y - this.originY;
	console.log(atX, atY);
	ctx.drawImage(this.image,atX,atY);
}

