function ObjectUtil() {}

module.exports = ObjectUtil;

ObjectUtil.clone = function(o) {
	var r = {};

	for (k in o)
		r[k] = o[k];

	return r;
}