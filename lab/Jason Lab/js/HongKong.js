function HongKong(coordinateX,coordinateY){
	var that = this;

	this.Health = 100;
	this.origin = {x:coordinateX, y:coordinateY};

	console.log("Hong Kong is located at [ "+this.origin.x+" , "+this.origin.y+" ]");

	return {
		getX: function() {
			console.log(that.origin.y);
			return that.origin.x;
		},
		getY: function() {
			console.log(that.origin.y);
			return that.origin.y;
		}
	}
}

