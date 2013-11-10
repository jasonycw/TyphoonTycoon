var Tower = function(xx,yy){
	this.x = xx;
	this.y = yy;
	this.sprite = new Image();
	this.sprite.src = "img/tower.png";
	this.origin = {	x:this.sprite.width/2, 
					y:this.sprite.height/2};

	ctx.drawImage(	
		this.sprite,
		this.x - this.origin.x,
		this.y - this.origin.y
	);
	
}
