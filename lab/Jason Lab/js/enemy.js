/**
 *
 */
 var p = Enemy.prototype = new Unit();// = new Unit();
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



p.on_tick = function(delta){
	if(this.x!=base.getX() || this.y!=base.getY()){
		console.log("Typhoon move from [ "+this.x+" , "+this.y+" ] ");
		if(this.x!=base.getX())
			this.x+=(this.x<base.getX())?1:-1;
		if(this.y!=base.getY())
			this.y+=(this.y<base.getY())?1:-1;
		console.log("to [ "+this.x+" , "+this.y+" ]");

		this.draw();
	}
	else{
		this.draw();
	}
}
