var Thenable = require("tinp");

/**
 * Thenable utilities.
 * @class ThenableUtil
 */
function ThenableUtil() {};
module.exports = ThenableUtil;

/**
 * Resolve thenable after specified number of millisecs.
 * @method delay
 * @static
 */
ThenableUtil.delay = function(millis) {
	var t = new Thenable();

	setTimeout(function() {
		t.resolve();
	}, millis);

	return t;
}