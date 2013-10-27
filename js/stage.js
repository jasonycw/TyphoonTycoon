define([
	"easel",
	"ui",
	"utility",
	"player",
	"game_obj",
	"bullet",
	"enemy",
	"building"
], function(easel, UI, Utility, Player, GameObj, Bullet, Enemy, Building) {

		function refresh(event) {

			//     // time based
			//     timeCircle.x = timeCircle.x + (event.delta)/1000*1000;
			//     timeCircle.y = timeCircle.y - (event.delta)/1000*1000;
			//     if (timeCircle.x > stage.canvas.width) { timeCircle.x = 0; }
			//     if (timeCircle.y < 0) { timeCircle.y = stage.canvas.height; }

			//     // not time based:
			//     tickCircle.x = tickCircle.x + 50; // 100 / 20 = 5
			//     tickCircle.y = tickCircle.y + 70;
			//     if (tickCircle.x > stage.canvas.width) { tickCircle.x = 0; }
			//     if (tickCircle.y > stage.canvas.height) { tickCircle.y = 0; }


			//     // green circle
			//     greenCircle.x = greenCircle.x + 20; // 100 / 20 = 5
			//     greenCircle.y = greenCircle.y + 20;
			//     if (greenCircle.x > stage.canvas.width) { greenCircle.x = 0; }
			//     if (greenCircle.y > stage.canvas.height) { greenCircle.y = 0; }

			stage.update(event);
		}

		stage = new createjs.Stage("game-canvas");
		console.log("stage.js loaded");

		// timeCircle = new createjs.Shape();
		// timeCircle.graphics.beginFill("red").drawCircle(0, 0, 40);
		// timeCircle.y = 50;
		// stage.addChild(timeCircle);

		// greenCircle = new createjs.Shape();
		// greenCircle.graphics.beginFill("green").drawCircle(0, 0, 40);
		// greenCircle.y = 100;
		// stage.addChild(greenCircle);
		
		// tickCircle = new createjs.Shape();
		// tickCircle.graphics.beginFill("blue").drawCircle(0, 0, 40);
		// tickCircle.y = 150;
		// stage.addChild(tickCircle);

		createjs.Ticker.addEventListener("tick", refresh);
		createjs.Ticker.setFPS(40);

		return stage;


});