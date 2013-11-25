// Define all constants here
define({
	// Area of Hong Kong in the map
	hkArea: {
		x: 376,
		y: 238,
		effectAreaRadius: 50,
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
		decayOnLand : 1,
		damage: 500
		intiMinAmong: 1,
		intiMaxAmong: 20,
		difficulty: 15, //larger is easier
		initDelay: 10 //1000 = 1 second
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
		cost:		1500
	},
	repelTower:{
		range : 100,
		power : -10,
		cost:	3000
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