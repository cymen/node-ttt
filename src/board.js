'use strict';
var Grid = require('./grid'),
    ROW_LENGTH = 3;

module.exports = function(cells) {
    var grid = new Grid(ROW_LENGTH, cells);

    return {
        get: function(index) {
            return grid.get(index);
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
