var gameCanvas = document.getElementById("game-canvas");
var ctx = gameCanvas.getContext("2d");
var gameMap = new Image();
gameMap.src="img/map.png";
gameMap.onload = function() {
	ctx.drawImage(gameMap,0,0);
};

gameCanvas.addEventListener('click', function(event){
	var x = event.clientX - gameCanvas.offsetLeft;
	var y = event.clientY - gameCanvas.offsetTop;
	var towr = new Tower(x, y, "img/tower.png");
});