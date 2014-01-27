'use strict';

var Q = require('q'),
    ui = require('../ui');

module.exports = {
    play: function(board) {
        return ui.getPlayerMove(board.emptyCells());
    },

    type: 'human'
};
