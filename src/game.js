'use strict';

var Q = require('q'),
    scorer = require('./scorer'),
    ui = require('./ui'),
    playerConstants = require('./player/constants'),
    x = playerConstants.X;

module.exports = {
    getMove: function(board, player_x, player_o) {
        var currentPlayer = (scorer.turn(board) === x) ? player_x : player_o;

        if (currentPlayer.type === 'human') {
            ui.printBoard(board);
        }

        return currentPlayer.play(board);
    },

    play: function(board, player_x, player_o) {
        var self = this;
        return Q.promise(function(resolve) {
            self
                .getMove(board, player_x, player_o)
                .then(function(choice) {
                    board.set(choice, scorer.turn(board));
                    if (!scorer.isOver(board)) {
                        resolve(self.play(board, player_x, player_o));
                    } else {
                        if (scorer.isTied(board)) {
                            ui.endingTied(board);
                        } else {
                            ui.endingWinner(board, scorer.winner(board));
                        }
                        resolve();
                    }
                });
        });
    }
};
