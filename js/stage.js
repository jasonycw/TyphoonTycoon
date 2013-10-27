define(["easel", "button"], function(easel, Button) {
        //return an object to define the "my/shirt" module.
        console.log(Button);
            stage = new createjs.Stage("game-canvas");
            console.log(stage);
            console.log(new Button("Hello!", "#F00"));
            var btn1 = stage.addChild(new Button("Hello!", "#F00"));
            btn1.x = 20;
            btn1.y = 20;
            
            var btn2 = stage.addChild(new Button("Goodbye.", "#0F0"));
            btn2.x = 20;
            btn2.y = btn1.y + 50;
            
            var btn3 = stage.addChild(new Button("Hello again!!", "#0FF"));
            btn3.y = btn2.y + 50;
            
            
            btn1.x = btn2.x = btn3.x = 20;
            
            createjs.Ticker.addEventListener("tick", stage);

            return stage;

    }
);