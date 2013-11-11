/**
 *
 */
function Enemy(coordinateX,coordinateY,imageSrc){
	if (!(this instanceof Enemy)) {
		throw new TypeError("Constructor cannot be called as a function.");
	}
	this.$super = Unit;
	this.$super(coordinateX,coordinateY,imageSrc); // java: super(coordinateX,coordinateY,imageSrc);
	this.speed=0;
	this.direction=0;
	console.log(this);

	enemy_list.push(this);
}

var p = Enemy.prototype = new Unit();// = new Unit();

p.on_tick = function(){
	var atX = this.x - this.origin.x;
	var atY = this.y - this.origin.y;
	if(atX!=base.getX() || atY!=base.getY()){
		console.log("Typhoon move from [ "+atX+" , "+atY+" ] ");
		if(this.x!=base.getX())
			this.x+=(this.x<base.getX())?1:-1;
		if(this.y!=base.getY())
			this.y+=(this.y<base.getY())?1:-1;
		atX = this.x - this.origin.x;
		atY = this.y - this.origin.y;
		console.log("to [ "+atX+" , "+atY+" ]");

		ctx.drawImage(this.image,atX,atY);
	}
	else
		console.log("Typhoon reaches Hong Kong at [ "+atX+" , "+atY+" ] ");
}
