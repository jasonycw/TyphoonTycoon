var gameCanvas = document.getElementById("game-canvas");
var ctx = gameCanvas.getContext("2d");
var gameSize = {width:gameCanvas.width,height:gameCanvas.height};
var base = new HongKong(370,270);
var enemy_list=[];
var tower_list=[];
var FPS = 30;

var gameMap = new Image();
gameMap.src="img/map.png";
gameMap.onload = function() {
	
	var towr = new Tower(30, 200, "img/tower.png");
	var enemy = new Enemy(gameSize.width, gameSize.height, "img/typhoon_placeholder.png");
	var enemy2 = new Enemy(60, 120, "img/typhoon_placeholder.png");

	setInterval(function(){
		ctx.clearRect(0,0,gameCanvas.width,gameCanvas.height);
		ctx.drawImage(gameMap,0,0);
		//console.log(enemy_list);

		for(var i=0;i<tower_list.length;i++){
			tower_list[i].draw();
		}
		for(var i=0; i <enemy_list.length; i++){
			//console.log(enemy_list[i]);
			enemy_list[i].on_tick();
		}


	},1000/FPS);


	
	
	
};

gameCanvas.addEventListener('click', function(event){
	var x = event.clientX - gameCanvas.offsetLeft;
	var y = event.clientY - gameCanvas.offsetTop;
	var towr = new Tower(x, y, "img/tower.png");
});