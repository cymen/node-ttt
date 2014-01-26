'use strict';

var Q = require('q'),
    ui = require('../ui');

module.exports = {
    play: function(board) {
        return ui.player_choose_cell(board.empty_cells());
    },

    type: 'human'
};
