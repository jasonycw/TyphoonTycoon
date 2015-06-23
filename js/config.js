// Define all constants here
define(
{
    // Area of Hong Kong in the map
    hkArea:
    {
        x: 376,
        y: 238,
        effectAreaRadius: 100,
        radius: 165,
        color: "rgba(200, 255, 0, 0.1)",
        lineWidth: 33,
        fillStyle: "rgba(200, 255, 0, 0.1)",
        cycleDuration: 140
    },

    nearestBuildingDistance: 40,


    enemy:
    {
        max_hp: 200,
        initHPFunction: function(baseHP, gameElapsedTime){
            // gameElapsedTime in seconds
            return (baseHP + gameElapsedTime*1.1) * (Math.random() * 0.5 + 0.5);
        },
        speed : 1,
        initSpeedFunction: function(baseSpeed, gameElapsedTime){
            // gameElapsedTime in seconds
            return baseSpeed + gameElapsedTime / 2000;
        },
        topSpeedFunction: function(baseSpeed, gameElapsedTime){
            // gameElapsedTime in seconds
            return 1.5 * (baseSpeed + gameElapsedTime / 20000);
        },
        decayOnLand: 1,
        damage: 150,
        typhoonAbsorbRate: 10,
        intiMinAmount: 1,
        intiMaxAmount: 1,
        difficulty: 50, //larger is easier

        earthquakeCountFunction: function(level){
            var cnt = -2 + Math.floor(0.8 * level);
            return (cnt>0? cnt: 0);
        },

        initDelay: 15, // seconds
        nextWaveWaitTimeFunction: function(gameElapsedTime){
            // gameElapsedTime in seconds

            return 7 - gameElapsedTime / 1000; //seconds
        }
    },

    // towers		=============================
    AttackTower:
    {
        title:"Laser Tower",
        description:"Shoots laser beam.",
        power: -3,
        cost: 500,
        buildEffectColor: "red",
        range: 150,
        attackDamage: 20,
        req: "none",
        builtOn: "Sea" // Sea or Land
    },
    FreezeTower:
    {
        title:"Freeze Tower",
        description:"Slows down things.",
        power: -6,
        cost: 700,
        buildEffectColor: "aqua",
        range: 70,
        attackDamage: 1,
        slowRate: 100,
        req: "University",
        builtOn: "Sea" // Sea or Land
    },
    RepelTower:
    {
        title:"Repel Tower",
        description:"Repels typhoons.",
        power: -10,
        cost: 2500,
        buildEffectColor: "#FF8000",
        range: 100,
        force: 150,
        req: "ResearchCenter",
        builtOn: "Sea" // Sea or Land
    },

    // structures	=============================
    PowerPlant:
    {
        title:"Power Plant",
        description:"Simple power plant.",
        power: 10,
        cost: 1000,
        buildEffectColor: "LawnGreen",
        req: "none",
        builtOn: "Land" // Sea or Land
    },
    NuclearPlant:
    {
        title:"Nuclear Power Plant",
        description:"Produces lots of power.",
        power: 40,
        cost: 5000,
        buildEffectColor: "LawnGreen",
        req: "ResearchCenter",
        builtOn: "Land" // Sea or Land
    },
    University:
    {
        title:"University",
        description:"Upgrades Laser Tower. Unlocks Freeze Tower. Effects stack.",
        power: -20,
        cost: 2500,
        buildEffectColor: "#f2b7ff",
        attackTowerAttackIncrease: 5,
        attackTowerRangeIncrease: 5,
        attackTowerCostIncrease: 20,
        req: "none",
        builtOn: "Land" // Sea or Land
    },
    ResearchCenter:
    {
        title:"Research Center",
        description:"Upgrades Laser and Freeze Tower. Unlocks Repel Tower. Effects stack.",
        power: -30,
        cost: 4000,
        buildEffectColor: "#ffcb8e",
        attackTowerAttackIncrease: 3,
        attackTowerRangeIncrease: 10,
        attackTowerCostIncrease: 100,
        freezeTowerSlowRateIncrease: 10,
        freezeTowerRangeIncrease: 10,
        freezeTowerAttackIncrease: 0.5,
        freezeTowerCostIncrease: 10,
        req: "University",
        builtOn: "Land" // Sea or Land
    },
    CheungKong:
    {
        title:"Li's Enterprise Headquarter",
        description:"Earn 50% more and upgrade Repel Tower. Income does not stack, but upgrades do.",
        power: -50,
        cost: 7000,
        buildEffectColor: "red",
        hsiIncrementMultiplier: 1.5,
        repelTowerRangeIncrease: 20,
        repelTowerForceIncrease: 70,
        repelTowerCostDecrease: 30,
        req: "ResearchCenter",
        builtOn: "Land" // Sea or Land
    },
    // Hang Sang Index
    HSI:
    {
        init: 5000, // default 5000
        upperOfRandom: 10,
        lowerOfRandom: -10,
        increment: 150
    },
    cash:
    {
        init: 3000
    },
    earthquake:
    {
        affectRadius: 30,
        radius: 50,
        delay: 5, //5
        effect:
        {
            duration: 0.5,
            rate: 0.09,
            amplitude: 0, //px //2
            color: 'silver',
            lineWidth: "1px"
        }
    }
});
