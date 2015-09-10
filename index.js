"use strict";

var Color = require('color');

module.exports = function (tasks) {

    tasks.addTask({
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
                let color = Color(fn.toString()),
                    hex = color.hexString();

                if (color.alpha() == 1) {
                    return fn.replaceWithCode(hex, 'Hex');
                }

                hex = hex.replace('#', '#' + Math.round(255 * color.alpha()).toString(16));

                addMsFilter(declaration.getAncestor('Block'), 'progid:DXImageTransform.Microsoft.gradient(startColorStr="' + hex + '", endColorStr="' + hex + '")');
            }
        }
    });

    function addMsFilter (block, filter) {
        var declaration = block.getChild({
                type: 'Declaration',
                name: 'filter',
                vendor: 'ms'
            });

        if (!declaration) {
            return block.pushCode('-ms-filter: ' + filter, 'Declaration', 'createMsFilter');
        }

        if (declaration.is({string: '-ms-filter: none;'})) {
            return declaration
                .get({
                    type: 'Keyword',
                    name: 'none'
                })
                .replaceWith((new stylecow.String()).setName(filter));
        }

        var string = declaration.get('String');

        if (string.name) {
            string.name += ',' + filter;
        } else {
            string.name = filter;
        }
    }
};
