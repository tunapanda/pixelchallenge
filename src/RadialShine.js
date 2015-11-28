var inherits = require('inherits');
var PIXI = require('pixi.js')

function RadialShine() {
	PIXI.Container.call(this);

	this.radials = new PIXI.Graphics();
	this.addChild(this.radials);

	/*this.radials.beginFill(0xff0000, 1);
	this.radials.drawRect(0, 0, 100, 100);*/

	this.drawn = false;
	this.rays = 11;
	this.radius = 250;
	this.rayWidth = 15;
	this.steps = 30;
	this.radiusVariation = .5;
	this.rayWidthVariation = .5;
}

inherits(RadialShine, PIXI.Container);
module.exports = RadialShine;

RadialShine.prototype.updateTransform = function() {
	if (!this.drawn)
		this.draw();

	PIXI.Container.prototype.updateTransform.call(this);
}

RadialShine.prototype.draw = function() {
	console.log("draw...");

	this.radials.clear();

	for (var i = 0; i < this.rays; i++) {
		var angle = i * Math.PI * 2 / this.rays;

		var useRadius = this.radius *
			(1 + this.radiusVariation * Math.random());

		var useRayWidth = this.rayWidth *
			(1 + this.rayWidthVariation * Math.random());

		var rayWidthRad = useRayWidth * Math.PI / 180;

		for (var step = 0; step < this.steps; step++) {
			this.radials.beginFill(0xff8000, (this.steps - step) / this.steps);

			this.radials.moveTo(
				step * useRadius / this.steps * Math.cos(angle - rayWidthRad / 2),
				step * useRadius / this.steps * Math.sin(angle - rayWidthRad / 2)
			);

			this.radials.lineTo(
				(step + 1) * useRadius / this.steps * Math.cos(angle - rayWidthRad / 2), (step + 1) * useRadius / this.steps * Math.sin(angle - rayWidthRad / 2)
			);

			this.radials.lineTo(
				(step + 1) * useRadius / this.steps * Math.cos(angle + rayWidthRad / 2), (step + 1) * useRadius / this.steps * Math.sin(angle + rayWidthRad / 2)
			);

			this.radials.lineTo(
				step * useRadius / this.steps * Math.cos(angle + rayWidthRad / 2),
				step * useRadius / this.steps * Math.sin(angle + rayWidthRad / 2)
			);

			this.radials.endFill();
		}
	}

	this.drawn = true;
}