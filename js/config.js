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
		HSI: 			-800
	},
	freezeTower:{
		range : 	70,
		slowRate : 	70,
		power: 		-6,
		HSI:		-3000
	},
	repelTower:{
		range : 100,
		power : -10,
		HSI:	-4500
	},

	// structures	=============================
	powerPlant:{
		power: 	10,
		HSI:	-1500
	},
	nuclearPlant:{
		power: 	40,
		HSI:	-7000
	},
	university:{
		power: 	-20,
		HSI:	-2500
	},
	researchCenter:{
		power: 	-30,
		HSI:	-4000
	},
	cheungKong:{
		power: 	-50,
		HSI:	-10000
	},
	

	// Hang Sang Index
	initHSI: 9000

});