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
	console.log("blah");
	this.x+=10;
	var atX = this.x - this.origin.x;
	var atY = this.y - this.origin.y;
	ctx.drawImage(this.image,atX,atY);
}
