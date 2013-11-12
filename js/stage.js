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
		// Display list for background
		this.backdropDisplayList = [];
		// Display list for towers
		this.towerDisplayList = [];
		// Display list for typhoons
		this.typhoonDisplayList = [];
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

			// Call the display object's tick method
			// 3. Typhoon
			_.each(this.typhoonDisplayList, function(item) {
				if (item) {
					item.tick();
				}
			});

			// Call the display object's render method
			var that = this;
			// 1. Backdrop
			_.each(this.backdropDisplayList, function(item) {
				if (item) {
					item.render(that.ctx);
				}
			});
			// 2. Tower
			_.each(this.towerDisplayList, function(item) {
				if (item) {
					item.render(that.ctx);
				}
			});
			// 3. Typhoon
			_.each(this.typhoonDisplayList, function(item) {
				if (item) {
					item.render(that.ctx);
				}
			});
		},

		/**
		 * Add an item to backdrop display list.
		 * @param  {Object} item  item to be added in the list
		 * @return {Number}       index of the item, use it for removing in display list
		 */
		addBackdrop: function(item) {
			this.backdropDisplayList.push(item);
			console.log(this.backdropDisplayList);
			return this.backdropDisplayList.length - 1;
		},

		/**
		 * Remove an item from backdrop display list.
		 * @param  {Number} index index of the item
		 */
		removeBackdrop: function(index) {
			delete this.backdropDisplayList[index];
		},

		/**
		 * Add an item to tower display list.
		 * @param  {Object} item  item to be added in the list
		 * @return {Number}       index of the item, use it for removing in display list
		 */
		addTower: function(item) {
			this.towerDisplayList.push(item);
			console.log(this.towerDisplayList);
			return this.towerDisplayList.length - 1;
		},

		/**
		 * Remove an item from tower display list.
		 * @param  {Number} index index of the item
		 */
		removeTower: function(index) {
			delete this.towerDisplayList[index];
		},

		/**
		 * Add an item to typhoon display list.
		 * @param  {Object} item  item to be added in the list
		 * @return {Number}       index of the item, use it for removing in display list
		 */
		addTyphoon: function(item) {
			this.typhoonDisplayList.push(item);
			console.log( this.typhoonDisplayList);
			return this.typhoonDisplayList.length - 1;
		},

		/**
		 * Remove an item from typhoon display list.
		 * @param  {Number} index index of the item
		 */
		removeTyphoon: function(index) {
			delete this.typhoonDisplayList[index];
		}
	};

	return Stage;
});