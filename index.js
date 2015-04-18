var color = require('stylecow-color');

module.exports = function (stylecow) {

	stylecow.addTask({
		forBrowsersLowerThan: {
			explorer: 9.0
		},
		filter: {
			type: 'Declaration',
			name: ['background', 'background-color']
		},
		fn: function (declaration) {
			var fn = declaration.get({
				type: 'Function',
				name: ['rgba', 'hsla']
			});

			if (fn) {
				var rgba = color.toRGBA(fn);

				if (rgba[3] === 1) {
					return fn.replaceWith(stylecow.parse('#' + color.RGBA_HEX(rgba), 'Hex'));
				}

				var hex = '#' + Math.round(255 * rgba[3]).toString(16) + color.RGBA_HEX(rgba);

				stylecow.utils.addMsFilter(declaration.getParent('Block'), 'progid:DXImageTransform.Microsoft.gradient(startColorStr="' + hex + '", endColorStr="' + hex + '")');
			}
		}
	});
};
