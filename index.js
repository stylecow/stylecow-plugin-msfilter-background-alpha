var color = require('stylecow-color');

module.exports = function (stylecow) {

	stylecow.addTask({
		disable: {
			explorer: 9.0
		},
		Declaration: {
			background: fixer,
			"background-color": fixer
		}
	});
};

function fixer (declaration) {
	var fn = declaration.search({type: 'Function', name: ['rgba', 'hsla']});

	if (fn.length === 1) {
		var rgba = color.toRGBA(fn[0]);

		if (rgba[3] === 1) {
			fn[0].replaceWith('#' + color.RGBA_HEX(rgba));
		} else {
			var hex = '#' + Math.round(255 * rgba[3]).toString(16) + color.RGBA_HEX(rgba);

			declaration.parent({type: 'Rule'}).addOldMsFilter('progid:DXImageTransform.Microsoft.gradient(startColorStr="' + hex + '", endColorStr="' + hex + '")');
		}
	}
}
