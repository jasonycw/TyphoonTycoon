/* global require */
'use strict';

require.config({
	// The shim config allows us to configure dependencies for
	// scripts that do not call define() to register a module
	shim: {
		jquery: {
			exports: '$'
		},
		underscore: {
			exports: '_',
			deps: ['jquery']
		}
	},
	paths: {
		jquery: 'libs/jquery/jquery-1.10.2.min',
		underscore: 'libs/underscore/underscore-min'
	}
});

// Start our app
require([
	'jquery',
	'game'
], function ($, Game) {

	/**
	 * A cross-browser requestAnimationFrame, See
	 * https://hacks.mozilla.org/2011/08/animating-with-javascript-from-setinterval-to-requestanimationframe/
	 * http://msdn.microsoft.com/zh-tw/library/ie/hh920765(v=vs.85).aspx
	 */
	window.requestAnimFrame = (function(){
		return window.requestAnimationFrame    || 
			window.webkitRequestAnimationFrame || 
			window.mozRequestAnimationFrame    || 
			window.oRequestAnimationFrame      || 
			window.msRequestAnimationFrame     || 
			function(callback) {
				window.setTimeout(callback, 1000 / 60);
			};
	})();

	// Start the game when DOM tree is ready
	$(document).ready(function() {
		var game = new Game();
		game.init();
	});
});