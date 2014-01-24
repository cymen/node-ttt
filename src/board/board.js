'use strict';

var Grid = require('../grid/grid'),
    ROW_LENGTH = 3;

module.exports = function(cells) {
    var grid = new Grid(ROW_LENGTH, cells);

    return {
        all_rows: function() {
            return grid.rows();
        },

        empty_cells: function() {
            return grid.open();
        },

        get: function(index) {
            return grid.get(index);
        },

        horizontal_rows: function() {
            return grid.horizontal_rows();
        },

        is_full: function() {
            return grid.open().length === 0;
        },

        set: function(index, value) {
            if (this.get(index)) {
                return new Error('Cannot set a cell that already has a value');
            } else {
                grid.set(index, value);
            }
        }
    };
};
