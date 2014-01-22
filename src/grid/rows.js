'use strict';

module.exports.horizontal = function(cells) {
    var rows = [],
        size = cells.length,
        length = Math.sqrt(size);

    for (var i = 0; i < size; i += length) {
        rows.push(cells.slice(i, length));
    }

    return rows;
};
