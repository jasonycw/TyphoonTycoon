define([
    'stage',
    'models/effect',
    'config',
    'utility'
], function(Stage, Effect, Config, Utility) {
    /*
		Create Object and Constructor
		https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
	 */
    /**
     * Creates a new Toast object
     * @param {number} x               x position realtive to the stage
     * @param {number} y               y position realtive to the stage
     * @param {string} msg             the message to show
     * @param {dir:number,
     *         time:number,
     *         dist:number,
     *         speed:number}    moving moving information. can omit one of {time,dist,speed}
     * @param {fontSize:cssFontsizeString,
     *         fontFamily:cssFontsizeString,
     *         textAlign:cssFontsizeString} style  styling for the message
     */
    function Toast(x, y, msg, moving, style) {
        /*
			Initialion - all variable/funciton must have "this." before
			Use "var" to change the variable/funciton become private
			"x || 0" just means "if there is a value for x, use that. Otherwise use 0."
		 */

        // parent constructor
        Effect.call(this);

        this.x = x || 0;
        this.y = y || 0;
        this.spawnPoint = {
            x: this.x,
            y: this.y
        };

        this.msg = msg;

        this.fontSize = "10px";
        this.fontFamily = "Arial";
        this.textAlign = "center";
        this.textColor = "white";
        this.outline = false;

        this.setStyle(style);

        this.moveDir = 0; // degree, 0 = left, 90 = down, 180 = right, 270 = up
        this.moveDirRad = 0; // this.moveDir in radian form
        this.moveTime = 0; // second
        this.moveDist = 0; //px
        this.moveSpeed = 0; // px per sec

        this.setMoving(moving);

        this.timeElapsed = 0;
        this.alpha = 1;
        this.init();
    };

    Toast.prototype = Object.create(Effect.prototype);
    Toast.prototype.constructor = Toast;

    /**
     * Set moving variables, can auto-infer variables
     * if all 3 are given, only moveTime, moveDist are considered
     * if less than 2 are given, an exception is thrown
     * @param {dir:number,
     *         time:number,
     *         dist:number,
     *         speed:number}    moving moving information. can omit one of {time,dist,speed}
     */
    Toast.prototype.setMoving = function(movingArgs) {

        // default moving directio is upwards
        this.moveDir = movingArgs.dir || 90;
        this.moveDirRad = this.moveDir * (Math.PI / 180); // this.moveDir in radian form

        if (movingArgs.hasOwnProperty("time") &&
            movingArgs.hasOwnProperty("dist")) {
            this.moveTime = movingArgs.time;
            this.moveDist = movingArgs.dist;
            this.moveSpeed = movingArgs.dist / movingArgs.time;

        } else if (movingArgs.hasOwnProperty("speed") &&
            movingArgs.hasOwnProperty("time")) {
            this.moveTime = movingArgs.time;
            this.moveSpeed = movingArgs.speed;
            this.moveDist = movingArgs.speed * movingArgs.time;

        } else if (movingArgs.hasOwnProperty("speed") &&
            movingArgs.hasOwnProperty("dist")) {
            this.moveDist = movingArgs.dist;
            this.moveSpeed = movingArgs.speed;
            this.moveTime = movingArgs.dist / movingArgs.speed;

        } else {
            throw "must have 2 of {time,dist,speed} to calculate time and movingArgs";
        }
    };
    /**
     * Set style by keys
     * @param {fontSize, 
     *         fontFamily, 
     *         textAlign, 
     *         color}      styleArgs style arguments. all parameters optional
     */
    Toast.prototype.setStyle = function(styleArgs) {

        if (styleArgs.hasOwnProperty("fontSize")) {
            this.fontSize = styleArgs.fontSize;
        }
        if (styleArgs.hasOwnProperty("fontFamily")) {
            this.fontSize = styleArgs.fontFamily;
        }
        if (styleArgs.hasOwnProperty("textAlign")) {
            this.textAlign = styleArgs.textAlign;
        }
        if (styleArgs.hasOwnProperty("color")) {
            this.textColor = styleArgs.color;
        }
        if (styleArgs.hasOwnProperty("outline")) {
            this.outline = styleArgs.outline;
        }
    };

    Toast.prototype.init = function() {};

    // tick event handler
    Toast.prototype.tick = function(dt) {
        this.timeElapsed += dt;
        if (this.timeElapsed > this.moveTime) {
            this.remove();
        }
        this.move(this.timeElapsed);
        //this.fade(this.timeElapsed);

    };
    Toast.prototype.move = function(timeElapsed) {
        this.x = this.spawnPoint.x +
            this.moveSpeed * timeElapsed * Math.cos(this.moveDirRad);
        this.y = this.spawnPoint.y +
            this.moveSpeed * timeElapsed * Math.sin(this.moveDirRad);
    }
    Toast.prototype.fade = function(timeElapsed) {
        this.alpha = Utility.easeOutCubic(timeElapsed, 1, -1, this.moveTime);
    }

    Toast.prototype.render = function(ctx) {
        //console.log("Toast render");
        var globalAlpha = ctx.globalAlpha;
        var oldFont = ctx.font;
        ctx.font = "" + this.fontSize + " " + this.fontFamily;
        ctx.fillStyle = this.textColor;
        ctx.textAlign = this.textAlign;
        if(this.outline){
            ctx.globalAlpha = this.alpha/3;
            var lineWidth = ctx.lineWidth;
            ctx.lineWidth = 2;
            ctx.strokeStyle = this.outline;
            ctx.strokeText(this.msg, this.x, this.y);
            ctx.lineWidth = lineWidth;
        }
        ctx.globalAlpha = this.alpha;
        ctx.fillText(this.msg, this.x, this.y);
        ctx.globalAlpha = globalAlpha;
        ctx.font = oldFont;
    };

    /**
     * remove the unit, without death effect
     */
    Toast.prototype.remove = function() {
        Stage.removeChild(this.id, 'effects');
    };

    Toast.prototype.setIndex = function(index) {
        this.effectIndex = index;
    };


    return Toast;
});
