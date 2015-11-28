PIXI = require("pixi.js");
var inherits = require("inherits");
var TWEEN = require("tween.js");
var ThenableUtil = require("./ThenableUtil");
var Thenable = require("tinp");

function Bug() {
	PIXI.Container.call(this);

	/*var s = PIXI.Sprite.fromFrame("warning.png");
	this.addChild(s);*/

	this.holder = new PIXI.Container();
	this.addChild(this.holder);

	var s = PIXI.Sprite.fromImage("warning.png");
	this.holder.addChild(s);

	s.x = -s.width / 2;
	s.y = -s.height / 2;

	this.x = 400;
	this.y = 300;

	this.visible = false;
}

inherits(Bug, PIXI.Container);
module.exports = Bug;

Bug.prototype.play = function() {
	this.playThenable = new Thenable();

	this.visible = true;

	this.scale.x = 0;
	this.scale.y = 0;
	var tween = new TWEEN.Tween(this.scale);
	tween.to({
		x: 1,
		y: 1,
	}, 1000);
	tween.easing(TWEEN.Easing.Elastic.Out);
	tween.start();

	var count = 0;
	var interval = setInterval(function() {
		count++;
		this.visible = !this.visible;

		if (count >= 10) {
			clearInterval(interval);
			this.visible = false;
			this.playThenable.resolve();
		}
	}.bind(this), 500);

	return this.playThenable;
}