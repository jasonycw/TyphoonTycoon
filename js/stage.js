define([
	'jquery',
	'underscore'
], function($, _) {
	var canvas;
	var ctx;
	var displayList = [];

	function Stage(id) {
		// Get the DOM element
		this.canvas = $('#' + id)[0];
		// Get the canvas context
		this.ctx = this.canvas.getContext && this.canvas.getContext('2d');
		if (!this.ctx) {
			throw 'Cannot get the canvas context';
		}
		this.counter = 0;
	}

	Stage.prototype = {
		constructor: Stage,
		getWidth: function() {
			return this.canvas.width;
		},
		getHeight: function() {
			return this.canvas.height;
		},
		getCanvas: function() {
			return this.canvas;
		},
		getContext: function() {
			return this.ctx;
		},
		render: function() {
			// Clear canvas
			this.ctx.clearRect(0, 0, this.getWidth(), this.getHeight());
			// Call the display object's render method
			_.each(displayList, function(item) {
				if (item) {
					item.render();
				}
			});
		},
		addChild: function(item) {
			console.log(displayList);
			displayList.push(item);
			return displayList.length - 1;
		},
		removeChild: function(index) {
			delete displayList[index];
		}
	};

	return Stage;
});