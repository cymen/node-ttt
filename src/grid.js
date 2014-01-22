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

            for (var x=0; x < length; x++) {
              var row = [];
              for (var y=x; y < size; y += length) {
                row.push(state[y]);
              }
              rows.push(row);
            }

            return rows;
        },

        size: function() {
            return size;
        }
    };
};
