// defines your module and loads any dependencies
define([
	'units/unit',
	'stage',
	'models/buildEffect',
	'config',
	'Game'
], function(Unit, Stage, BuildEffect, Config, Game) {

	//Create Tower Object and its constructor
	function ResearchCenter(startX, startY, spriteSrc) {
		// Call super constructor.
		Unit.call(this, startX, startY, spriteSrc);
		var buildEffect = new BuildEffect(this.x, this.y, "#ffcb8e", 40, 40, 3);

		// Auto add to stage
		this.id = Stage.addChild(this, 'towers');

		Config.attackTower.range += 5;
		Config.attackTower.attackDamage += 3;
		Config.attackTower.cost += 100;
		Config.freezeTower.range += 10;
		Config.freezeTower.slowRate += 10;
		Config.freezeTower.cost += 100;
		Game.built('ResearchCenter');
		Game.addPower(Config.researchCenter.power);
	}
	// subclass extends superclass
	ResearchCenter.prototype = Object.create(Unit.prototype);
	ResearchCenter.prototype.constructor = ResearchCenter;
	
	return ResearchCenter;
});