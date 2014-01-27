'use strict';

var calculateLength = function(cells) {
    return Math.sqrt(cells.length);
};

module.exports = {
    all: function(cells) {
        return []
            .concat(this.horizontal(cells))
            .concat(this.vertical(cells))
            .concat(this.diagonal(cells));
    },

    diagonal: function(cells) {
        var left = [],
            right = [],
            size = cells.length,
            length = calculateLength(cells),
            i,
            j;

        if (length % 2 === 0) {
            return new Error('Cannot determine diagonal rows on a grid with even length sides');
        }

        for (i = 0; i < size; i += length + 1) {
            left.push(cells[i]);
        }

        for (j = length - 1; j < size - 1; j += length - 1) {
            right.push(cells[j]);
        }

        return [left, right];
    },

    horizontal: function(cells) {
        var rows = [],
            size = cells.length,
            length = calculateLength(cells),
            i;

        for (i = 0; i < size; i += length) {
            rows.push(cells.slice(i, i + length));
        }

        return rows;
    },

    vertical: function(cells) {
        var rows = [],
            size = cells.length,
            length = calculateLength(cells),
            x;

        for (x = 0; x < length; x++) {
            var row = [],
                y;
            for (y = x; y < size; y += length) {
                row.push(cells[y]);
            }
            rows.push(row);
        }

        return rows;
    }
};
