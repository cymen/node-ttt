'use strict';

module.exports = function(length, values) {
    var keys = [],
        state = {},
        size = length * length,
        values = values || [];

    for (var i=1; i < size + 1; i++) {
        keys.push(i);
        state[i] = values[i-1];
    }

    return {
        cells: function() {
            return keys.map(function(k) {
                return state[k];
            });
        },

        horizontal_rows: function() {
            var rows = [],
                cells = this.cells();

            for (var i=0; i < size; i += length) {
                rows.push(cells.slice(i, 3));
            }

            return rows;
        },

        vertical_rows: function() {
            var rows = [];

            // 0, 1, 2
            // 3  4  5
            // 6  7  8
            rows.push([state[0], state[3], state[6]]);
            rows.push([state[1], state[4], state[7]]);
            rows.push([state[2], state[5], state[8]]);

            return rows;
        },

        size: function() {
            return size;
        }
    };
};
