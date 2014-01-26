'use strict';
var prompter = require('single-prompt'),
    view = require('./board/view');

module.exports = {
    ending: function(board, message) {
        this.print_board(board);
        console.log(message);
        console.log();
    },

    greeting: function() {
        console.log();
        console.log('Tic-Tac-Toe');
        console.log();
    },

    play_again: function() {
        return prompter.prompt('Play again', ['y', 'n']);
    },

    player_choice: function() {
        return prompter.prompt('Would you like to be x or o (x goes first)', ['x', 'o']);
    },

    print_board: function(board) {
        console.log();
        console.log(view.board(board.horizontal_rows()));
    }
};
