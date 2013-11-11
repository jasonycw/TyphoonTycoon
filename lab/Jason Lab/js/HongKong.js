function HongKong(coordinateX,coordinateY){
	var that = this;

	this.Health = 100;
	this.origin = {x:coordinateX, y:coordinateY};

	console.log("Hong Kong is located at [ "+this.origin.x+" , "+this.origin.y+" ]");

	return {
		getX: function() {
			return that.origin.x;
		},
		getY: function() {
			return that.origin.y;
		}
	}
}

