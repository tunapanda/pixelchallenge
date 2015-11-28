PIXI = require("pixi.js");
var PixiApp = require("pixiapp");
var inherits = require("inherits");
var Piece = require("./Piece");
var RadialShine = require("./RadialShine");
var TWEEN = require("tween.js");

function PixelChallenge() {
	PixiApp.call(this, 500, 500);

	window.onkeypress = this.onKeyPress.bind(this);

	this.shine = new RadialShine();
	this.shine.x = 250;
	this.shine.y = 250;
	this.addChild(this.shine);

	this.piece = new Piece();
	this.addChild(this.piece);
	this.piece.setPiece(0);

	this.on("frame", TWEEN.update);

	this.shine.alpha = 0;
}

inherits(PixelChallenge, PixiApp);

PixelChallenge.prototype.onKeyPress = function(ev) {
	this.targetPiece = parseInt(String.fromCharCode(ev.charCode));

	this.count = 100;
	this.rotate();
}

PixelChallenge.prototype.rotate = function() {
	if (!this.count) {
		this.piece.setPiece(this.targetPiece);

		this.shine.scale.x = 0;
		this.shine.scale.y = 0;
		var tween = new TWEEN.Tween(this.shine.scale);
		tween.to({
			x: 1,
			y: 1,
		}, 500);
		tween.start();

		this.shine.alpha = 0;
		var tween = new TWEEN.Tween(this.shine);
		tween.to({
			alpha: 1
		}, 500);
		tween.start();

		this.shine.rotation = 0;
		var tween = new TWEEN.Tween(this.shine);
		tween.to({
			rotation: Math.PI * 2
		}, 10000);
		tween.start();

		setTimeout(function() {
			var tween = new TWEEN.Tween(this.shine);
			tween.to({
				alpha: 0
			}, 2000);
			tween.start();
		}.bind(this), 2000);

		this.piece.scale.x = 0;
		this.piece.scale.y = 0;
		var tween = new TWEEN.Tween(this.piece.scale);
		tween.to({
			x: 1,
			y: 1,
		}, 2000);
		tween.easing(TWEEN.Easing.Elastic.Out);
		tween.start();

		return;
	}

	this.piece.setPiece(-1);

	this.count--;
	setTimeout(this.rotate.bind(this), 50);
}

new PixelChallenge();