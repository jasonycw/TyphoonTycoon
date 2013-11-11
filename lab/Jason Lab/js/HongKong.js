function HongKong(coordinateX,coordinateY){
	var that = this;

	this.Health = 100;
	this.origin = {x:coordinateX, y:coordinateY};

	console.log(this.origin.x,this.origin.y);
	
	return {
		getOriginX: function() {
			console.log(that.origin.y);
			return that.origin.x;
		},
		getOriginY: function() {
			console.log(that.origin.y);
			return that.origin.y;
		}
	}
}

