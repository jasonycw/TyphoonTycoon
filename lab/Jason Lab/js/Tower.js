function Tower(coordinateX,coordinateY,imageSrc){
	if (!(this instanceof Tower)) {
		throw new TypeError("Constructor cannot be called as a function.");
	}
	this.$super = Unit;
	this.$super(coordinateX,coordinateY,imageSrc); // java: super(coordinateX,coordinateY,imageSrc);
	

	tower_list.push(this);
}

var t = Tower.prototype = new Unit();
