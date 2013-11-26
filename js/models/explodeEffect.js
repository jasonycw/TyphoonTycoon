// defines your module and loads any dependencies
// http://www.gameplaypassion.com/blog/explosion-effect-html5-canvas/
define([
	'stage',
	'models/effect',
	'config'
], function(Stage, Effect, Config) {

	console.log("explodeEffect.js loaded");
	/*
		Create Object and Constructor
		https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
	 */
	var particles = [];

	function ExplodeEffect( targetX, targetY ){
		//console.log("Unit Constructor is called");	
		
		/*
		 * A single explosion particle
		 */
		function Particle ()
		{
			this.scale = 1.0;
			this.x = 0;
			this.y = 0;
			this.radius = 20;
			this.color = "#000";
			this.velocityX = 0;
			this.velocityY = 0;
			this.scaleSpeed = 0.5;

			this.update = function(ms)
			{
				// shrinking
				this.scale -= this.scaleSpeed * ms;

				if (this.scale <= 0)
				{
					this.scale = 0;
				}
				// moving away from explosion center
				this.x += this.velocityX * ms;
				this.y += this.velocityY * ms;
			};

			this.draw = function(context2D)
			{
				// translating the 2D context to the particle coordinates
				context2D.save();
				context2D.translate(this.x, this.y);
				context2D.scale(this.scale, this.scale);

				// drawing a filled circle in the particle's local space
				context2D.beginPath();
				context2D.arc(0, 0, this.radius, 0, Math.PI*2, true);
				context2D.closePath();

				context2D.fillStyle = this.color;
				context2D.fill();

				context2D.restore();
			};
		}

		this.createExplosion( targetX, targetY, Config.explodEffect.particleColor);
		
		this.id = Stage.addChild(this,'effects');
	};

	ExplodeEffect.prototype = Object.create(Effect.prototype);
	ExplodeEffect.prototype.constructor = ExplodeEffect;

	// tick event handler
	ExplodeEffect.prototype.tick = function(dt){
		// draw a white background to clear canvas
		// context2D.fillStyle = "#FFF";
		// context2D.fillRect(0, 0, context2D.canvas.width, context2D.canvas.height);

		// update particles
		for (var i=0; i<particles.length; i++)
		{
			var particle = particles[i];
			particle.update(dt);
		}
	};

	ExplodeEffect.prototype.render = function(ctx){
		// update and draw particles
		for (var i=0; i<particles.length; i++)
		{
			var particle = particles[i];
			particle.draw(ctx);
		}
	};
	/**
	 * remove the unit, without death effect
	 */
	ExplodeEffect.prototype.remove = function(){
		Stage.removeChild(this.id,'effects');
	};

	ExplodeEffect.prototype.setIndex = function(index){
		that.effectIndex = index;
	};


	ExplodeEffect.prototype.randomFloat = function(min, max)
	{
		return min + Math.random()*(max-min);
	};

	ExplodeEffect.prototype.createExplosion = function (x, y, color){
		var minSize = 10;
		var maxSize = 30;
		var count = 10;
		var minSpeed = 60.0;
		var maxSpeed = 200.0;
		var minScaleSpeed = 1.0;
		var maxScaleSpeed = 4.0;

		that = this;

		for (var angle=0; angle<360; angle += Math.round(360/count))
		{
			var particle = new that.Particle();

			particle.x = x;
			particle.y = y;

			particle.radius = randomFloat(minSize, maxSize);

			particle.color = color;

			particle.scaleSpeed = randomFloat(minScaleSpeed, maxScaleSpeed);

			var speed = randomFloat(minSpeed, maxSpeed);

			particle.velocityX = speed * Math.cos(angle * Math.PI / 180.0);
			particle.velocityY = speed * Math.sin(angle * Math.PI / 180.0);

			particles.push(particle);
		}
	};

	return ExplodeEffect;
});