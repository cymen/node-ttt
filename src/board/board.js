'use strict';

var Grid = require('../grid/grid'),
    ROW_LENGTH = 3;

module.exports = function(cells) {
    var grid = new Grid(ROW_LENGTH, cells);

    return {
        CELL_COUNT: ROW_LENGTH * ROW_LENGTH,

        allRows: function() {
            return grid.rows();
        },

        emptyCells: function() {
            return grid.unset();
        },

        get: function(index) {
            return grid.get(index);
        },

        horizontalRows: function() {
            return grid.horizontal_rows();
        },

        isFull: function() {
            return grid.unset().length === 0;
        },

        set: function(index, value) {
            if (this.get(index)) {
                return new Error('Cannot set a cell that already has a value');
            } else {
                grid.set(index, value);
            }
        },

        unset: function(index) {
            grid.set(index, undefined);
        }
    };
};
