// defines your module and loads any dependencies
define([
	'signals',
	'config',
	'models/signals/sigTyphoonKilled',
	'models/signals/sigStructureBuilt',
	'models/signals/sigStructureKilled',
	'models/signals/sigOutageStart',
	'models/signals/sigOutageStop',
	'models/signals/sigTyphoonAtHK'
], function(signals, Config, SigTyphoonKilled, SigStructureBuilt, SigStructureKilled, SigOutageStart, SigOutageStop, SigTyphoonAtHK) {

	function Statistics(game) {
		var that = this;
		this.game = game;
		SigTyphoonKilled.get().add(function(){
			console.log("stat");
			that.count("typhoonKills");
		});
		SigStructureBuilt.get().add(function(){
			console.log("stat");
			that.count("structuresBuilt");
		});
		SigStructureKilled.get().add(function(){
			console.log("stat");
			that.count("structuesDestroyedByEarthquakes");
		});
		SigOutageStart.get().add(function(){
			console.log("stat");
			that.startTimer("outage");
		});
		SigOutageStop.get().add(function(){
			console.log("stat");
			that.stopTimer("outage");
		});
		SigTyphoonAtHK.get().add(function(){
			console.log("stat");
			that.count("storming");
		});
		this.reset();
	}
	/*
	 * time survived
	 * typhoons erased
	 * structures built
	 * structures destroyed by earthquakes
	 * 
	 * typhoons repelled out of screen
	 */
	Statistics.prototype = {
		constructor: Statistics,
		reset:function(){
			this.counter={
				typhoonKills:0,
				structuresBuilt:0,
				structuesDestroyedByEarthquakes:0,
				storming:0
			};
			this.timers={
				outage:{start:-1,time:0}
			};
		},
		getStatistics: function(){
			this.peekTimer("outage");

			var result = {};
			result.playTime = this.game.gameTime;
			result.typhoonKills = this.counter.typhoonKills;
			result.structuresBuilt = this.counter.structuresBuilt;
			result.structuesDestroyedByEarthquakes = this.counter.structuesDestroyedByEarthquakes;
			result.timeSpentInOutage = this.timers.outage.time;
			result.timesBeingStormed = this.counter.storming;
			return result;
		},
		count: function(itemName){
			this.counter[itemName]++;
		},
		startTimer:function(itemName){
			this.timers[itemName].start = this.game.gameTime;
		},
		peekTimer:function(itemName){
			this.stopTimer(itemName);
			this.startTimer(itemName);
		},
		stopTimer:function(itemName){
			if(this.timers[itemName].start==-1) return;
			this.timers[itemName].time += this.game.gameTime - this.timers[itemName].start;
			this.timers[itemName].start = -1;
		},
	};

	return Statistics;
});