define([
    'stage',
    'models/effect'
], function(Stage, Effect)
{
    /*
		Create Object and Constructor
		https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
	 */
    function HurtEffect(duration)
    {
        /*
         * Initialion - all variable/funciton must have "this." before
         * Use "var" to change the variable/funciton become private
         * "x || 0" just means "if there is a value for x, use that. Otherwise use 0."
         */
        Effect.call(this);
        this.x = 0;
        this.y = 0;
        this.duration = duration;
        this.totalDuration = duration;
        this.alpha = 1;

        // update sprite origin according to sprite size
    };

    HurtEffect.prototype = Object.create(Effect.prototype);
    HurtEffect.prototype.constructor = HurtEffect;

    var sprite = new Image();
    sprite.src = "img/warning.png";

    HurtEffect.getSprite = function(){
        return sprite;
    };

    // tick event handler
    HurtEffect.prototype.tick = function(dt)
    {
        this.duration -= dt;
        if (this.duration <= 0) this.remove();
        this.alpha = this.duration / this.totalDuration;
        this.alpha = (this.alpha > 0.5? 1: this.alpha * 2);
    };

    HurtEffect.prototype.render = function(ctx)
    {
        var drawX = this.x;
        var drawY = this.y;

        var sprite = HurtEffect.getSprite();

        var globalAlpha = ctx.globalAlpha;
        ctx.globalAlpha = this.alpha;
        ctx.drawImage(sprite, drawX, drawY);
        ctx.globalAlpha = globalAlpha;
    };
    /**
     * remove the unit, without death effect
     */
    HurtEffect.prototype.remove = function()
    {
        Stage.removeChild(this.id, 'effects');
    };

    HurtEffect.prototype.setIndex = function(index)
    {
        this.effectIndex = index;
    };

    return HurtEffect;
});
