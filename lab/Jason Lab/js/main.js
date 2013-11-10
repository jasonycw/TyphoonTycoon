var gameCanvas = document.getElementById("game-canvas");
var ctx = gameCanvas.getContext("2d");

var enemy_list=[];

var gameMap = new Image();
gameMap.src="img/map.png";
gameMap.onload = function() {
	ctx.drawImage(gameMap,0,0);

	setInterval(function(){
		//console.log(enemy_list);
		for(var i=0; i <enemy_list.length; i++){
			//console.log(enemy_list[i]);
			enemy_list[i].on_tick();
		}
	},50);

	var towr = new Tower(30, 30, "img/tower.png");
	var enemy = new Enemy(60, 60, "img/typhoon_placeholder.png");
	var enemy2 = new Enemy(60, 120, "img/typhoon_placeholder.png");
	
	
};

gameCanvas.addEventListener('click', function(event){
	var x = event.clientX - gameCanvas.offsetLeft;
	var y = event.clientY - gameCanvas.offsetTop;
	var towr = new Tower(x, y, "img/tower.png");
});