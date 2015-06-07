// defines your module and loads any dependencies
define([
	'jquery',
	'soundCuePoints'
], function($, CuePoints) {

	function Sound(playerId) {
		this.playerId = playerId;
		this.loaded = false;
		this.player = $('#' + playerId)[0];
		var that = this;
		this.player.addEventListener('canplaythrough', function() {
			that.loaded = true;
		}, false);
		this.stopTimer = null;
	}


	Sound.prototype = {
		constructor: Sound,
		finishLoading: function() {
			this.loaded = true;
		},
		play: function(id) {
			var that = this;
			if (!this.loaded) {
				//return;
			}

			if (this.playerId == 'buildSound' || this.player.paused) {
				var start = CuePoints[id].start;
				var end = CuePoints[id].end;
				this.player.currentTime = start;
				that.player.play();
				clearTimeout(this.stopTimer);
				this.stopTimer = setTimeout(function() {
					that.player.pause();
				}, (end - start) * 1000);
			}
		}
	};

	return Sound;
});
