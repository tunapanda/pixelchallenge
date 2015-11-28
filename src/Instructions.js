PIXI = require("pixi.js");
var inherits = require("inherits");

function Instructions() {
	PIXI.Container.call(this);

	this.draw();
}

inherits(Instructions, PIXI.Container);
module.exports = Instructions;

Instructions.prototype.draw = function() {
	this.holder = new PIXI.Container();
	this.addChild(this.holder);

	var instructionDatas = [{
		label: "FORWARD"
	}, {
		label: "TURN LEFT"
	}, {
		label: "TURN RIGHT"
	}, {
		label: "PUT PIXEL"
	}];

	for (var i = 0; i < instructionDatas.length; i++) {
		var instructionData = instructionDatas[i];
		var card = this.createCard(instructionData);

		card.x = 200 * i;
		card.y = 500;

		this.holder.addChild(card);
	}
}

Instructions.prototype.createCard = function(data) {
	var card = new PIXI.Container();

	var g = new PIXI.Graphics();
	g.beginFill(0x8080ff, 1);
	g.drawRoundedRect(10, 10, 180, 80, 10);
	card.addChild(g);

	/*var filter = new PIXI.filters.DropShadowFilter();
	filter.distance = 0;
	filter.blur = 10;
	card.filters = [filter];*/

	var style = {
		font: "800 22px Sans",
		fill: "#000000",
	};

	var t = new PIXI.Text(data.label, style);
	t.x = 100 - t.width / 2;
	t.y = 36;
	card.addChild(t);

	return card;
}