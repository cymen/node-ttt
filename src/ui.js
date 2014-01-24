'use strict';

var prompter = require('single-prompt'),
    Board = require('./board/board');

module.exports = {
    greeting: function() {
        console.log('Tic-Tac-Toe');
    },

    player_choice: function() {
        return prompter.prompt('Would you like to be x or o (x goes first)', ['x', 'o']);
    }
};
