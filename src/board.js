'use strict';
var ROW_LENGTH = 3,
    CELL_COUNT = ROW_LENGTH * ROW_LENGTH;

module.exports = function(cells) {
    cells = cells || [];

    return {
        cells: function() {
            return cells.slice(0);
        },

        get: function(index) {
            return cells[index - 1];
        },

        open: function() {
            var open = [];
            for (var i = 0; i < CELL_COUNT; i++) {
                if (!cells[i]) {
                    open.push(i + 1);
                }
            }
            return open;
        },

        set: function(index, value) {
            if (cells[index - 1]) {
                return new Error('Cannot set a cell that already has a value');
            } else {
                cells[index - 1] = value;
            }
        }
    };
};
