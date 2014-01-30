'use strict';
var prompter = require('keypress-prompt'),
    playerConstants = require('./player/constants'),
    x = playerConstants.X,
    o = playerConstants.O,
    view = require('./board/view');

module.exports = {
    ending: function(board, message) {
        this.printBoard(board);
        console.log(message);
        console.log();
    },

    endingTied: function(board) {
        this.ending(board, 'Tied!');
    },

    endingWinner: function(board, winner) {
        this.ending(board, winner + ' wins!');
    },

    getPlayerMove: function(cells) {
        return prompter
            .prompt('Choose a space', cells)
            .fail(function() {
                process.exit(1);
            });
    },

    greeting: function() {
        console.log();
        console.log('Tic-Tac-Toe');
        console.log();
    },

    playAgain: function() {
        return prompter
            .prompt('Play again', ['y', 'n'])
            .then(function(choice) {
                return choice === 'y';
            })
            .fail(function() {
                process.exit(1);
            });
    },

    playerChoice: function() {
        return prompter
            .prompt('Would you like to be x or o (x goes first)', [x, o])
            .fail(function() {
                process.exit(1);
            });
    },

    printBoard: function(board) {
        console.log();
        console.log(view.board(board.horizontalRows()));
    }
};
