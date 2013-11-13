define([
	'jquery',
	'underscore'
], function($, _) {

	function Stage(id) {
		// Get the DOM element
		this.canvas = $('#' + id)[0];
		// Get the canvas context
		this.ctx = this.canvas.getContext && this.canvas.getContext('2d');
		if (!this.ctx) {
			throw 'Cannot get the canvas context';
		}
		//mean render item in displayList['stage'] first
		Stage.displayList = {
			'backdrops': 	[],
			'towers': 		[],
			'typhoons': 	[],
			'others': 		[]
		}

		//declare static variable 
		Stage.width = this.canvas.width;
		Stage.height = this.canvas.height;

		/**
		 * Add an item to specific display list.
		 * @param  {Object} item  item to be added in the list
		 * @return {Number}       index of the item, use it for removing in display list
		 */
		Stage.addChild = function(item, listName) {
			// default list
		    if (listName === undefined) {
		        listName = "others";
		    }
			this.displayList[listName].push(item);
			console.log(this.displayList);

			return this.displayList[listName].length - 1;
		}

		/**
		 * Remove an item from specific display list.
		 * @param  {Number} index index of the item
		 */
		Stage.removeChild = function(index, listName) {

			//default list
		    if (listName === undefined) {
		        listName = "others";
		    }

			delete this.displayList[listName][index];
		}
	}

	Stage.prototype = {
		constructor: Stage,
		/**
		 * Render the objects in display lists.
		 */
		render: function() {
			// Clear canvas
			this.ctx.clearRect(0, 0, Stage.width, Stage.height);

			// Call the display object's render method
			var that = this;
			_.each(Stage.displayList, function(renderList) {
				_.each(renderList, function(item) {
					if (item) {
						item.render(that.ctx);
					}
				})
			});
		}
	
	};

	return Stage;
});