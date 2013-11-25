// defines your module and loads any dependencies
define([
	'jquery',
	'soundCuePoints'
], function($, CuePoints) {

	function Sound(playerId) {
		this.loaded = false;
		this.player = $('#' + playerId)[0];
		var that = this;
		this.player.addEventListener('canplaythrough', function() {
			that.loaded = true;
		}, false);
	}


	Sound.prototype = {
		constructor: Sound,
		finishLoading: function() {
			this.loaded = true;
		},
		play: function(id) {
			if (!this.loaded) {
				//return;
			}
			var start = CuePoints[id].start;
			var end = CuePoints[id].end;
			this.player.currentTime = start;
			this.player.play();
			var that = this;
			setTimeout(function() {
				that.player.pause();
			}, (end - start) * 1000);
		}
	};

	return Sound;
});