'use strict';

var Q = require('q'),
    scorer = require('./scorer'),
    ui = require('./ui'),
    playerConstants = require('./player/constants'),
    x = playerConstants.X;

module.exports = {
    get_play: function(board, player_x, player_o) {
        var current_player = (scorer.turn(board) === x) ? player_x : player_o;

        if (current_player.type === 'human') {
            ui.print_board(board);
        }

        return current_player.play(board);
    },

    play: function(board, player_x, player_o) {
        var self = this;
        return Q.promise(function(resolve) {
            self
                .get_play(board, player_x, player_o)
                .then(function(choice) {
                    board.set(choice, scorer.turn(board));
                    if (!scorer.isOver(board)) {
                        resolve(self.play(board, player_x, player_o));
                    } else {
                        var ending_message = (scorer.isTied(board)) ? 'Tied!' : scorer.winner(board) + ' wins!';
                        ui.ending(board, ending_message);
                        resolve();
                    }
                });
        });
    }
};
