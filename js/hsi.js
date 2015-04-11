// defines your module and loads any dependencies
define([
	'signals'
], function(signals) {

	function HSI(initValue) {
		this._hsi = initValue;
		// signal: event system without a centralized event controller
		this._sNegativeHSI = signals.Signal();
		// TODO: add history object to record HSI change
	}

	HSI.prototype = {
		constructor: HSI,
		getHSI: function(){
			return this._hsi;
		},
		/**
		 * adds amount of points into HSI, no direct control of it
		 * @param {number} amount positive or negative amount added
		 */
		addHSI:function(amount){
			this._hsi+=amount;
			if(this._hsi<=0){
				this._sNegativeHSI.dispatch(this._hsi);
			}
		},
		// expose my negative HSI signal object
		getSNegativeHSI: function(){
			return this._sNegativeHSI;
		}
	};

	return HSI;
});