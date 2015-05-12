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
		max_hp: 300,
		decayOnLand: 1,
		damage: 150,
		typhoonAbsorbRate: 10,
		intiMinAmong: 1,
		intiMaxAmong: 20,
		difficulty: 50, //larger is easier
		initDelay: 8 //1 = 1 second
	},

	// towers		=============================
	AttackTower:
	{
		power: -3,
		cost: 500,
		buildEffectColor: "red",
		range: 150,
		attackDamage: 20
	},
	FreezeTower:
	{
		power: -6,
		cost: 700,
		buildEffectColor: "aqua",
		range: 70,
		attackDamage: 1,
		slowRate: 80
	},
	RepelTower:
	{
		power: -10,
		cost: 2500,
		buildEffectColor: "#FF8000",
		range: 100,
		force: 170
	},

	// structures	=============================
	PowerPlant:
	{
		power: 10,
		cost: 1000,
		buildEffectColor: "LawnGreen"
	},
	NuclearPlant:
	{
		power: 40,
		cost: 5000,
		buildEffectColor: "LawnGreen"
	},
	University:
	{
		power: -20,
		cost: 2500,
		buildEffectColor: "#f2b7ff",
		attackTowerAttackIncrease: 5,
		attackTowerRangeIncrease: 5,
		attackTowerCostIncrease: 20
	},
	ResearchCenter:
	{
		power: -30,
		cost: 4000,
		buildEffectColor: "#ffcb8e",
		attackTowerAttackIncrease: 3,
		attackTowerRangeIncrease: 10,
		attackTowerCostIncrease: 100,
		freezeTowerSlowRateIncrease: 10,
		freezeTowerRangeIncrease: 10,
		freezeTowerAttackIncrease: 1,
		freezeTowerCostIncrease: 10
	},
	CheungKong:
	{
		power: -50,
		cost: 7000,
		buildEffectColor: "red",
		hsiIncrementMultiplier: 2,
		repelTowerRangeIncrease: 20,
		repelTowerForceIncrease: 70,
		repelTowerCostDecrease: 30
	},
	// Hang Sang Index
	HSI:
	{
		init: 90000, // 9000
		upperOfRandom: 10,
		lowerOfRandom: -10,
		increment: 40
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
