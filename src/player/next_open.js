'use strict';

var Q = require('q');

module.exports = {
    play: function(board) {
        return Q.resolve(board.empty_cells()[0]);
    },

    type: 'computer'
};
