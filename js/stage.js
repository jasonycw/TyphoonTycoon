define(["jquery"], function($) {

		console.log("stage.js loaded");

		var Stage = function(canvasId)
		{
			var stage = $(canvasId);
			var displayList = [];

			function getWidth()
			{
				return stage.width();
			}

			function getHeight()
			{
				return stage.height();
			}

			var ctx=canvas.getContext && canvas.getContext('2d');
			function update()
			{
				
				if (ctx){
					for (var i = 0; i < displayList.length; i++) {
						displayList[i].update();
					}	
				}			
			}

			function addChild(obj)
			{
				displayList.push(obj);
			}
		}

		return Stage;
});