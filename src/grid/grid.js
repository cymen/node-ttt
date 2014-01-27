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

        get: function(index) {
            return state[index];
        },

        unset: function() {
            var unset = [];

            keys.forEach(function(k) {
                if (state[k] === undefined) {
                    unset.push(k);
                }
            });

            return unset;
        },

        horizontalRows: function() {
            return rows.horizontal(this.cells());
        },

        verticalRows: function() {
            return rows.vertical(this.cells());
        },

        diagonalRows: function() {
            return rows.diagonal(this.cells());
        },

        rows: function() {
            return rows.all(this.cells());
        },

        set: function(index, value) {
            state[index] = value;
        }
    };
};
