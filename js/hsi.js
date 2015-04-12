// defines your module and loads any dependencies
define([
	'signals'
], function(signals) {

	function HSI(initValue) {
		this.on={
			hsiDepleted: signals.Signal()
		};
		this._hsi = initValue;
		// signal: event system without a centralized event controller
		// TODO: add history object to record HSI change
	}

	HSI.prototype = {
		constructor: HSI,
		on:{},
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
				this.on.hsiDepleted.dispatch(this._hsi);
			}
		}
	};

	return HSI;
});