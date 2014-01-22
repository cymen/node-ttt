'use strict';

var calculate_length = function(cells) {
    return Math.sqrt(cells.length);
};

var diagonal = function(cells) {
    var left = [],
        right = [],
        size = cells.length,
        length = calculate_length(cells);

    if (length % 2 === 0) {
        return new Error('Cannot determine diagonal rows on a grid with even length sides');
    }

    for (var i = 1; i <= size; i += length + 1) {
        left.push(cells[i - 1]);
        right.push(cells[i - 1 + length]);
    }

    return [left, right];
};

var horizontal = function(cells) {
    var rows = [],
        size = cells.length,
        length = calculate_length(cells);

    for (var i = 0; i < size; i += length) {
        rows.push(cells.slice(i, length));
    }

    return rows;
};

var vertical = function(cells) {
    var rows = [],
        size = cells.length,
        length = calculate_length(cells);

    for (var x = 0; x < length; x++) {
        var row = [];
        for (var y = x; y < size; y += length) {
            row.push(cells[y]);
        }
        rows.push(row);
    }

    return rows;
};

var all = function(cells) {
    return []
        .concat(horizontal(cells))
        .concat(vertical(cells))
        .concat(diagonal(cells));
};

module.exports.all = all;
module.exports.diagonal = diagonal;
module.exports.horizontal = horizontal;
module.exports.vertical = vertical;
