// Define all constants here
define({
	// Area of Hong Kong in the map
	hkArea: {
		x: 376,
		y: 238,
		radius: 165,
		color: "rgba(200, 255, 0, 0.1)",
		lineWidth: 33,
		fillStyle: "rgba(200, 255, 0, 0.1)",
		cycleDuration: 140
	},
	nearestBuildingDistance: 40,
	typhoonAbsorbRate: 10,

	enemy:{
		max_hp : 300,
		decayOnLand : 1
	},

	// towers		=============================
	attackTower:{
		range : 		150,
		attackDamage : 	20,
		power: 			-3,
		cost: 			500
	},
	freezeTower:{
		range : 	70,
		slowRate : 	70,
		power: 		-6,
		cost:		2000
	},
	repelTower:{
		range : 100,
		power : -10,
		cost:	3500
	},

	// structures	=============================
	powerPlant:{
		power: 	10,
		cost:	1000
	},
	nuclearPlant:{
		power: 	40,
		cost:	5000
	},
	university:{
		power: 	-20,
		cost:	2500
	},
	researchCenter:{
		power: 	-30,
		cost:	4000
	},
	cheungKong:{
		power: 	-50,
		cost:	10000
	},
	// Hang Sang Index
	HSI:{
		init: 9000,
		upperOfRandom: 20,
		lowerOfRandom: -20,
		increment: 20
	}
});