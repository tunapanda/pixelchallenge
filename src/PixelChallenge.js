PIXI = require("pixi.js");
var PixiApp = require("pixiapp");
var inherits = require("inherits");
var Piece = require("./Piece");
var RadialShine = require("./RadialShine");
var TWEEN = require("tween.js");
var ObjectUtil = require("./ObjectUtil");
var PlusOne = require("./PlusOne");
var Bug = require("./Bug");
var Instructions = require("./Instructions");

function PixelChallenge() {
	PixiApp.call(this, 800, 600);

	this.on("frame", TWEEN.update);

	PIXI.loader.add("warning.png");
	PIXI.loader.load(this.onAssetsLoaded.bind(this));
}

inherits(PixelChallenge, PixiApp);

PixelChallenge.prototype.onAssetsLoaded = function() {
	window.onkeypress = this.onKeyPress.bind(this);

	this.shine = new RadialShine();
	this.shine.x = 400;
	this.shine.y = 300;
	this.addChild(this.shine);

	this.piece = new Piece();
	this.addChild(this.piece);
	this.piece.setPiece(0);

	this.shine.alpha = 0;

	var redStyle = {
		font: "800 150px Sans",
		dropShadow: true,
		fill: "#ff0000",
		dropShadowColor: "#000000",
		dropShadowDistance: 5,
		dropShadowAngle: Math.PI / 4,
		stroke: "#000000",
		strokeThickness: 5
	};

	this.redScoreField = new PIXI.Text("0", redStyle);
	this.addChild(this.redScoreField);

	var greenStyle = ObjectUtil.clone(redStyle);
	greenStyle.fill = "#00ff00";

	this.greenScoreField = new PIXI.Text("0", greenStyle);
	this.greenScoreField.x = 800 - this.greenScoreField.width;
	this.addChild(this.greenScoreField);

	this.plusOne = new PlusOne();
	this.addChild(this.plusOne);

	this.bug = new Bug();
	this.addChild(this.bug);

	this.instructions = new Instructions();
	this.addChild(this.instructions);
	this.instructions.visible = false;
}

PixelChallenge.prototype.onKeyPress = function(ev) {
	var key = String.fromCharCode(ev.charCode).toLowerCase();

	switch (key) {
		case "0":
		case "1":
		case "2":
		case "3":
		case "4":
		case "5":
		case "6":
		case "7":
		case "8":
		case "9":
			this.piece.visible = true;
			this.targetPiece = parseInt(String.fromCharCode(ev.charCode));
			this.count = 100;
			this.rotate();
			break;

		case "r":
			this.plusOne.play("red").then(function() {
				this.redScoreField.text = parseInt(this.redScoreField.text) + 1;
			}.bind(this));
			break;

		case "g":
			this.plusOne.play("green").then(function() {
				this.greenScoreField.text = parseInt(this.greenScoreField.text) + 1;
			}.bind(this));
			break;

		case "c":
			this.piece.visible = false;
			this.redScoreField.text = "0";
			this.greenScoreField.text = "0";
			break;

		case "b":
			this.backgroundColor = 0xff8080;
			this.bug.play().then(function() {
				this.backgroundColor = 0xffffff;
			}.bind(this));
			break;

		case "i":
			this.instructions.visible = !this.instructions.visible;
			break;
	}
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