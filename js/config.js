// Define all constants here
define({
	// Area of Hong Kong in the map
	hkArea: {
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


	enemy: {
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
	attackTower: {
		range: 150,
		attackDamage: 20,
		power: -3,
		cost: 500
	},
	freezeTower: {
		range: 70,
		attackDamage: 5,
		slowRate: 80,
		power: -6,
		cost: 700
	},
	repelTower: {
		range: 100,
		force: 170,
		power: -10,
		cost: 2500
	},

	// structures	=============================
	powerPlant: {
		power: 10,
		cost: 1000
	},
	nuclearPlant: {
		power: 40,
		cost: 5000
	},
	university: {
		power: -20,
		cost: 2500,
		attackTowerAttackIncrease: 5,
		attackTowerRangeIncrease: 5,
		attackTowerCostIncrease: 20
	},
	researchCenter: {
		power: -30,
		cost: 4000,
		attackTowerAttackIncrease: 3,
		attackTowerRangeIncrease: 10,
		attackTowerCostIncrease: 100,
		freezeTowerSlowRateIncrease: 10,
		freezeTowerRangeIncrease: 10,
		freezeTowerAttackIncrease: 5,
		freezeTowerCostIncrease: 10
	},
	cheungKong: {
		power: -50,
		cost: 7000,
		hsiIncrementMultiplier: 2,
		repelTowerRangeIncrease: 20,
		repelTowerForceIncrease: 70,
		repelTowerCostDecrease: 30
	},
	// Hang Sang Index
	HSI: {
		init: 9000,
		upperOfRandom: 10,
		lowerOfRandom: -10,
		increment: 40
	},
	earthquake: {
		affectRadius: 30,
		effectColor: '#C71585',
		radius: 40,
		lineWidth: 3,
		duration: 30,
		cycle: 3
	}
});
