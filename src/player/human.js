'use strict';

var Q = require('q'),
    prompter = require('single-prompt');

module.exports = {
    play: function(board) {
        return prompter.prompt('Choose a space', board.empty_cells());
    },

    type: 'human'
};
