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
			deps: ['jquery'],
			exports: '_'
		},
		waitSeconds: 15
	},
	paths: {
		jquery: 'libs/jquery/jquery-1.10.2.min',
		underscore: 'libs/underscore/underscore-min',
		signals: 'libs/signals/signals'
	}
});

// Start our app
require([
	'jquery',
	'game'
], function($, Game) {

	/**
	 * A cross-browser requestAnimationFrame, See
	 * https://hacks.mozilla.org/2011/08/animating-with-javascript-from-setinterval-to-requestanimationframe/
	 * http://msdn.microsoft.com/zh-tw/library/ie/hh920765(v=vs.85).aspx
	 */
	(function() {
		var lastTime = 0,
		vendors = ['ms', 'moz', 'webkit', 'o'],
		x,
		length,
		currTime,
		timeToCall;

		for (x = 0, length = vendors.length; x < length && !window.requestAnimationFrame; ++x) {
			window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
			window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
		}

		if (!window.requestAnimationFrame)
			window.requestAnimationFrame = function(callback, element) {
				currTime = new Date().getTime();
				timeToCall = Math.max(0, 16 - (currTime - lastTime));
				lastTime = currTime + timeToCall;
				return window.setTimeout(function() { callback(currTime + timeToCall); }, 
					timeToCall);
			};

		if (!window.cancelAnimationFrame)
			window.cancelAnimationFrame = function(id) {
				clearTimeout(id);
			};
	}());

	// Start the game when DOM tree is ready
	$(document).ready(function() {
		window.game = Game;
		Game.init();
	});
});