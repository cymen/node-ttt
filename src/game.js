'use strict';

var Q = require('q'),
    scorer = require('./scorer'),
    ui = require('./ui');

module.exports = {
    play: function(board, player_x, player_o) {
        var self = this;
        return Q.promise(function(resolve) {
            self
                .get_play(board, player_x, player_o)
                .then(function(choice) {
                    board.set(choice, scorer.turn(board));
                    if (!scorer.is_over(board)) {
                        resolve(self.play(board, player_x, player_o));
                    } else {
                        var ending_message = (scorer.is_tied(board)) ? 'Tied!' : scorer.winner(board) + ' wins!';
                        ui.ending(board, ending_message);
                        resolve();
                    }
                });
        });
    },

    get_play: function(board, player_x, player_o) {
        var current_player;

        if (scorer.turn(board) === 'x') {
            current_player = player_x;
        } else {
            current_player = player_o;
        }

        if (current_player.type === 'human') {
            ui.print_board(board);
        }

        return current_player.play(board);
    }
};
