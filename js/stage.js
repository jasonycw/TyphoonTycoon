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
		this.displayList = {
			'Stages':[], 
			'Units':[], 
			'Models':[], 
			'Others':[]  
		}
	}

	Stage.prototype = {
		constructor: Stage,
		getWidth: function() {
			return this.canvas.width;
		},
		getHeight: function() {
			return this.canvas.height;
		},

		/**
		 * Render the objects in display lists.
		 */
		render: function() {
			// Clear canvas
			//console.log(this);
			this.ctx.clearRect(0, 0, this.getWidth(), this.getHeight());

			// Call the display object's render method
			var that = this;
			_.each(this.displayList, function(renderList) {
				_.each(renderList, function(item) {
					if (item) {
						item.render(that.ctx);
					}
				})
			});
		},

		/**
		 * Add an item to specific display list.
		 * @param  {Object} item  item to be added in the list
		 * @return {Number}       index of the item, use it for removing in display list
		 */

		addChild: function(item, listName) {
			//default list
		    if (listName === undefined) {
		        listName = "Others";
		    }
			this.displayList[listName].push(item);
			console.log(this.displayList);

			return this.displayList[listName].length - 1;
		},
				/**
		 * Remove an item from specific display list.
		 * @param  {Number} index index of the item
		 */
		removeChild: function(index, listName) {

			//default list
		    if (listName === undefined) {
		        listName = "Others";
		    }

			delete this.displayList[listName][index];
		}
	
	};

	return Stage;
});