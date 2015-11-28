PIXI = require("pixi.js");
var inherits = require("inherits");
var RadialShine = require("./RadialShine");
var TWEEN = require("tween.js");
var ThenableUtil = require("./ThenableUtil");

function PlusOne() {
	PIXI.Container.call(this);

	this.holder = new PIXI.Container();
	this.addChild(this.holder);

	this.style = {
		font: "800 400px Sans",
		dropShadow: true,
		fill: "#ff0000",
		dropShadowColor: "#000000",
		dropShadowDistance: 5,
		dropShadowAngle: Math.PI / 4,
		stroke: "#000000",
		strokeThickness: 5
	};

	this.textField = new PIXI.Text("+1", this.style);
	this.textField.x = -this.textField.width / 2;
	this.textField.y = -this.textField.height / 2;
	this.holder.addChild(this.textField);

	this.x = 400;
	this.y = 300;
	this.visible = false;


}

inherits(PlusOne, PIXI.Container);
module.exports = PlusOne;

PlusOne.prototype.play = function(color) {
	switch (color) {
		case "red":
			this.targetX = 40;
			this.style.fill = "#ff0000";
			break;

		case "green":
			this.targetX = 760;
			this.style.fill = "#00ff00";
			break;
	}

	this.textField.setStyle(this.style);

	this.visible = true;
	this.x = 400;
	this.y = 300;

	this.scale.x = 0;
	this.scale.y = 0;
	var tween = new TWEEN.Tween(this.scale);
	tween.to({
		x: 1,
		y: 1,
	}, 1000);
	tween.easing(TWEEN.Easing.Elastic.Out);
	tween.start();

	setTimeout(function() {
		var tween = new TWEEN.Tween(this);
		tween.to({
			x: this.targetX,
			y: 80,
		}, 1000);
		tween.easing(TWEEN.Easing.Quadratic.InOut);
		tween.start();

		var tween = new TWEEN.Tween(this.scale);
		tween.to({
			x: 0,
			y: 0,
		}, 1000);
		tween.easing(TWEEN.Easing.Quadratic.InOut);
		tween.start();
	}.bind(this), 1000);

	return ThenableUtil.delay(2000);
}