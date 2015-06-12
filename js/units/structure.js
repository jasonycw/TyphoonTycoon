define([
    'utility',
    'units/unit',
    'stage',
    'config',
    'models/buildEffect',
    'models/toast',
    'sound',
    'models/signals/sigGameReset'
], function(Utility, Unit, Stage, Config, BuildEffect, Toast, Sound, SigGameReset)
{
    // Create Tower Object and its constructor
    function Structure(startX, startY, spriteSrc, game, name)
    {
        name = name || "Structure";


        this.structureID = Structure.instanceList.length;
        Structure.instanceList.push(this);

        //call super constructor.
        Unit.call(this, startX, startY, spriteSrc, game, name);
        //Auto add to stage
        this.id = Stage.addChild(this, 'structures');
        // Sound Effect
        this.buildSound = new Sound('buildSound');

        this.onCreated();

    }
    //subclass extends superclass
    Structure.prototype = Object.create(Unit.prototype);
    Structure.prototype.constructor = Structure;


    // static functions and variables
    Structure.instanceList = [];
    Structure.all = function(callback){
        for(var i=0; i < Structure.instanceList.length; i++){
            if(Structure.instanceList[i] != undefined &&
                Structure.instanceList[i] != null){
                    callback(Structure.instanceList[i]);
            }
        }
    }
    SigGameReset.get().add(function(){
        console.log("structure reset called");
        Structure.instanceList=[];
    });

    Structure.canBeBuilt = function(towerName, mousePos, isLand, cost, game){

        // land
        if(isLand && Config[towerName].builtOn == "Sea"){
            return {result:false, message:"must build on Sea"};;
        }
        if(!isLand && Config[towerName].builtOn == "Land"){
            return {result:false, message:"must build on Land"};;
        }

        // money
        if(game.getHSI() < cost){
            return {result:false, message:"not enough HSI"};;
        }

        // power
        // if it is not power plants and it will cause power outage
        if(Config[towerName].power<0 && game.getAvailablePower() + Config[towerName].power < 0){
            return {result:false, message:"not enough power"};;
        }

        // distance to another suructure
        var nearestBuilding = Structure.findNearestBuilding(mousePos.x, mousePos.y);
        if (nearestBuilding) {
            if (nearestBuilding.distance <= Config.nearestBuildingDistance){
                return {result:false, message:"too close to structures"};;
            }
        }

        return {result:true, message:"go ahead"};
    };

    Structure.prototype.fulfillTechReq =function(){
        return true;
    };

    Structure.prototype.getCost = function(game){
        return 0;
    };

    Structure.prototype.onCreated = function()
    {

        // update power consumption
        this.game.addPower(this.config.power);

        // draw a ripple on create
        var buildEffect =
            new BuildEffect(
                this.x, this.y,
                this.config.buildEffectColor, 1, 40, 3);

        // if have enough power
        var availablePower = this.game.getAvailablePower();
        if (availablePower >= 0)
        {

            // normal toast message indicating
            // additional power consumer/producer
            var buildToast = new Toast(
                this.x, this.y - 10,
                "Power " + (this.config.power > 0 ? "+" : "") +
                this.config.power,
                {dir: 270, time: 0.5, dist: 30},
                {fontSize: "14px"});

            this.game.onEnoughPower();

            this.buildSound.play('plot');
        }
        else
        {

            // normal toast, but 1 line higher
            var buildToast = new Toast(
                this.x, this.y - 10 - 14,
                "Power " + (this.config.power > 0 ? "+" : "") +
                    this.config.power,
                {dir: 270, time: 0.5, dist: 30},
                {fontSize: "14px"});

            // error message after that.
            // message changes depending on
            // whether the power outage is solved or not
            if (this.config.power > 0)
            {
                var errorMsg = "Build More!";
                var buildToast = new Toast(
                    this.x, this.y - 10,
                    errorMsg,
                    {dir: 270, time: 2, dist: 30},
                    {fontSize: "14px", color: "red"});
            }

            this.game.onOutOfPower();

            // low power sound
            this.buildSound.play('outOfPower');
        }
    };
    // tick event handler
    Structure.prototype.tick = function(dt)
    { // override
        //empty
    };

    /**
     * remove the unit, without death effect
     */
    Structure.prototype.remove = function()
    {
        Stage.removeChild(this.id, 'structures');
        // return the power it got
        this.game.reducePower(Config[this.name].power);
        var buildToast = new Toast(
            this.x, this.y - 10,
            "Power " + ((0 - Config[this.name].power) > 0 ? "+" :
                "") +
            (0 - Config[this.name].power),
            {
                dir: 270,
                time: 2,
                dist: 50
            },
            {
                fontSize: "14px"
            });
        if (this.game.getAvailablePower() <= 0)
        {
            this.game.onOutOfPower();

            // low power sound
            this.buildSound.play('outOfPower');
        }else{
            this.game.onEnoughPower();

            // low power sound
            this.buildSound.play('plot');
        }
    }


    Structure.findNearestBuilding = function(x, y) {
        var nearestBuilding = null;
        var nearestDist = 10000000;
        var tempBuilding // reused variable
        var dist; // reused variable
        _.each(Stage.displayList['structures'], function(tempBuilding) {
            //Utility.pointIsCloseEnough
            dist = Utility.pointDistance(x, y, tempBuilding.x, tempBuilding.y);
            if (dist < nearestDist) {
                nearestBuilding = tempBuilding;
                nearestDist = dist;
            }
        });

        if (typeof nearestBuilding === 'object')
            return {
                targetBuilding: nearestBuilding,
                distance: nearestDist
            };
        else
            return null;
    };

    return Structure;
});
