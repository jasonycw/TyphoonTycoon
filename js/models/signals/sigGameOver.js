define([
    'signals'
], function(signals) {
    
    var singleton = new signals.Signal();

    return {get:function(){
        return singleton;
    }};
});
