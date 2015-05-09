var Color = require('color');

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
				var color = Color(fn.toString());
				var hex = color.hexString();

				if (color.alpha() == 1) {
					return fn.replaceWith(stylecow.parse(hex, 'Hex'));
				}

				hex = hex.replace('#', '#' + Math.round(255 * color.alpha()).toString(16));

				stylecow.utils.addMsFilter(declaration.getParent('Block'), 'progid:DXImageTransform.Microsoft.gradient(startColorStr="' + hex + '", endColorStr="' + hex + '")');
			}
		}
	});
};
