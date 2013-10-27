define(["easel"], function(easel) {
        //return an object to define the "my/shirt" module.
            
            function refresh(event) {
                // time based
                timeCircle.x = timeCircle.x + (event.delta)/1000*100;
                if (timeCircle.x > stage.canvas.width) { timeCircle.x = 0; }
                
                // not time based:
                tickCircle.x = tickCircle.x + 5; // 100 / 20 = 5
                if (tickCircle.x > stage.canvas.width) { tickCircle.x = 0; }
                
                stage.update(event);
            }

            stage = new createjs.Stage("game-canvas");
            //console.log(stage);
            
            timeCircle = new createjs.Shape();
            timeCircle.graphics.beginFill("red").drawCircle(0, 0, 40);
            timeCircle.y = 50;
            stage.addChild(timeCircle);

            tickCircle = new createjs.Shape();
            tickCircle.graphics.beginFill("blue").drawCircle(0, 0, 40);
            tickCircle.y = 150;
            stage.addChild(tickCircle);


            createjs.Ticker.addEventListener("tick", refresh);

            return stage;

    }
);