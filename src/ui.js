'use strict';
var prompter = require('single-prompt');

module.exports = {
    greeting: function() {
        console.log();
        console.log('Tic-Tac-Toe');
        console.log();
    },

    play_again: function() {
        console.log();
        return prompter.prompt('Play again', ['y', 'n']);
    },

    player_choice: function() {
        return prompter.prompt('Would you like to be x or o (x goes first)', ['x', 'o']);
    }
};
