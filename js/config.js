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
	laserTower:{
		range : 		150,
		attackDamage : 	10,
		power: 			-3,
		cost: 			-800
	},
	freezeTower:{
		range : 	70,
		slowRate : 	70,
		power: 		-6,
		cost:		-3000
	},
	repelTower:{
		range : 100,
		power : -10,
		cost:	-4500
	},

	// structures	=============================
	powerPlant:{
		power: 	10,
		cost:	-1500
	},
	nuclearPlant:{
		power: 	40,
		cost:	-7000
	},
	university:{
		power: 	-20,
		cost:	-2500
	},
	researchCenter:{
		power: 	-30,
		cost:	-4000
	},
	cheungKong:{
		power: 	-50,
		cost:	-10000
	},
	// Hang Sang Index
	HSI:{
		init: 9000,
		upperOfRandom: 200,
		lowerOfRandom: -100,
		increment: 2
	}
});