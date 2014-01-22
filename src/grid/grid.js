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
            return rows.vertical(this.cells());
        },

        diagonal_rows: function() {
            return rows.diagonal(this.cells());
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
