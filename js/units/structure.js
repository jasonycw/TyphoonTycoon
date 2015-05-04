define([
    'utility',
    'units/unit',
    'stage',
    'config',
    'models/buildEffect',
    'models/toast'
], function(Utility, Unit, Stage, Config, BuildEffect, Toast) {
    // Create Tower Object and its constructor
    function Structure(startX, startY, spriteSrc, game, name) {
            name = name || "Structure";
            //call super constructor.
            Unit.call(this, startX, startY, spriteSrc, game, name);
            //Auto add to stage
            this.id = Stage.addChild(this, 'structures');
            this.onCreated();
        }
        //subclass extends superclass
    Structure.prototype = Object.create(Unit.prototype);
    Structure.prototype.constructor = Structure;


    Structure.prototype.onCreated = function() {
        this.game.addPower(this.config.power);
        var buildEffect =
            new BuildEffect(
                this.x, this.y,
                this.config.buildEffectColor, 40, 40, 3);
        var buildToast = new Toast(
            this.x, this.y - 10,
            "Power " + (this.config.power > 0 ? "+" : "") +
            this.config.power, {
                dir: 270,
                time: 2,
                dist: 50
            }, {
                fontSize: "14px"
            });
    };
    // tick event handler
    Structure.prototype.tick = function(dt) { // override
        //empty
    };

    /**
     * remove the unit, without death effect
     */
    Structure.prototype.remove = function() {
        Stage.removeChild(this.id, 'structures');
        console.log(this.name);
        // return the power it got
        this.game.reducePower(Config[this.name].power);
        var buildToast = new Toast(
            this.x, this.y - 10,
            "Power " + ((0 - Config[this.name].power) > 0 ? "+" :
                "") +
            (0 - Config[this.name].power), {
                dir: 270,
                time: 2,
                dist: 50
            }, {
                fontSize: "14px"
            });
    }

    return Structure;
});
