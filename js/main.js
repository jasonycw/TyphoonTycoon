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
		underscore: 'libs/underscore/underscore-min',
		text: 'libs/require/text'
	}
});

require([
	'jquery',
	'game'
], function ($, Game) {
	$(document).ready(function() {
		Game.init();
	});
});