PIXI = require("pixi.js");
var inherits = require("inherits");
var RadialShine = require("./RadialShine");

function Piece() {
	PIXI.Container.call(this);

	this.holder = new PIXI.Container();
	this.addChild(this.holder);
}

inherits(Piece, PIXI.Container);
module.exports = Piece;

Piece.prototype.createBlock = function(x, y) {
	var g = new PIXI.Graphics();
	g.x = x * 100;
	g.y = y * 100;
	g.beginFill(0x000000, 1);
	g.drawRect(0, 0, 90, 90);
	this.holder.addChild(g);
}

Piece.prototype.setPiece = function(index) {
	var pieces = [
		[
			"xxxx",
		],
		[
			"xx",
			"xx",
		],
		[
			"xxx",
			"x"
		],
		[
			"xxx",
			"  x"
		],
		[
			"x",
			"x",
			"xx"
		],

		[
			"x",
			"xx",
			"x"
		],
		[
			" x",
			"xxx"
		],
		[
			"xxx",
			"x  "
		],
	];

	if (index < 0)
		index = Math.floor(pieces.length * Math.random());

	this.holder.removeChildren();

	var rows = pieces[index];

	for (rowIndex = 0; rowIndex < rows.length; rowIndex++) {
		var row = rows[rowIndex];
		for (colIndex = 0; colIndex < row.length; colIndex++) {
			if (row[colIndex] != " ") {
				this.createBlock(colIndex, rowIndex);
			}
		}
	}

	this.holder.x = -this.holder.width / 2;
	this.holder.y = -this.holder.height / 2;

	this.x = 250; // - this.width / 2;
	this.y = 250; // - this.height / 2;
}