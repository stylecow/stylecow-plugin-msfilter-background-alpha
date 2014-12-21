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
			var fn = declaration.searchFirst({
				type: 'Function',
				name: ['rgba', 'hsla']
			});

			if (fn) {
				var rgba = color.toRGBA(fn);

				if (rgba[3] === 1) {
					return fn.replaceWith(stylecow.Keyword.createFromString('#' + color.RGBA_HEX(rgba)));
				}

				var hex = '#' + Math.round(255 * rgba[3]).toString(16) + color.RGBA_HEX(rgba);
				var filter = 'progid:DXImageTransform.Microsoft.gradient(startColorStr="' + hex + '", endColorStr="' + hex + '")';
				var block = declaration.parent({type: 'Block' });

				stylecow.utils.addMsFilter(block, filter);
			}
		}
	});
};
