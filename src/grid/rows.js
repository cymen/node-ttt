'use strict';

module.exports.diagonal = function(cells) {
    var left = [],
        right = [],
        size = cells.length,
        length = Math.sqrt(size);

    if (length % 2 === 0) {
        return new Error('Cannot determine diagonal rows on a grid with even length sides');
    }

    for (var i = 1; i <= size; i += length + 1) {
        left.push(cells[i - 1]);
        right.push(cells[i - 1 + length]);
    }

    return [left, right];
};

module.exports.horizontal = function(cells) {
    var rows = [],
        size = cells.length,
        length = Math.sqrt(size);

    for (var i = 0; i < size; i += length) {
        rows.push(cells.slice(i, length));
    }

    return rows;
};

module.exports.vertical = function(cells) {
    var rows = [],
        size = cells.length,
        length = Math.sqrt(size);

    for (var x = 0; x < length; x++) {
        var row = [];
        for (var y = x; y < size; y += length) {
            row.push(cells[y]);
        }
        rows.push(row);
    }

    return rows;
};
