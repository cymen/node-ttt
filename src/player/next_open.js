'use strict';

var Q = require('q');

module.exports = {
    play: function(board) {
        return Q.resolve(board.emptyCells()[0]);
    },

    type: 'computer'
};
