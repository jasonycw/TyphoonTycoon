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
		},
		easel: {
			exports: 'createjs'
		},
		tween: {
			deps: ['easel'],
			exports: 'Tween'
		}
	},
	paths: {
		jquery: 'libs/jquery/jquery-1.10.2.min',
		underscore: 'libs/underscore/underscore-min',
		text: 'libs/require/text',
		easel: 'libs/createjs/easeljs-0.7.0.min',
		tween: 'libs/createjs/tweenjs-0.5.0.min'
	}
});

require([
	'jquery',
	'stage'
], function ($) {
	$(document).ready(function() {
		console.log('it works!');
		stage;
	});
});