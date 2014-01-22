'use strict';
var rows = require('./rows');

module.exports = function(length, values) {
    var keys = [],
        state = {},
        size = length * length;

    values = values || [];

    for (var i = 1; i < size + 1; i++) {
        keys.push(i);
        state[i] = values[i - 1];
    }

    return {
        cells: function() {
            return keys.map(function(k) {
                return state[k];
            });
        },

        open: function() {
            var open = [];

            keys.forEach(function(k) {
                if (state[k] === undefined) {
                    open.push(k);
                }
            });

            return open;
        },

        horizontal_rows: function() {
            return rows.horizontal(this.cells());
        },

        vertical_rows: function() {
            var rows = [];

            for (var x = 0; x < length; x++) {
                var row = [];
                for (var y = x; y < size; y += length) {
                    row.push(state[y]);
                }
                rows.push(row);
            }

            return rows;
        },

        diagonal_rows: function() {
            if (length % 2 === 0) {
                return new Error('Cannot determine diagonal rows on a grid with even length sides');
            }

            var left = [],
                right = [];

            for (var i = 1; i <= size; i += length + 1) {
                left.push(state[i]);
                right.push(state[i + length]);
            }

            return [left, right];
        },

        rows: function() {
            return []
                .concat(this.horizontal_rows())
                .concat(this.vertical_rows())
                .concat(this.diagonal_rows());
        },

        size: function() {
            return size;
        },

        set: function(index, value) {
            state[index] = value;
        },

        get: function(index) {
            return state[index];
        }
    };
};
