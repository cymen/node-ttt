'use strict';

var Q = require('q'),
    scorer = require('./scorer'),
    print = require('./board/print');

module.exports = {
    play: function(board, player_x, player_o) {
        var self = this;
        return Q.promise(function(resolve) {
            self
                .get_play(board, player_x, player_o)
                .then(function(choice) {
                    board.set(choice, scorer.turn(board));
                    if (scorer.is_over(board)) {
                        resolve();
                    } else {
                        resolve(self.play(board, player_x, player_o));
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
            print.rows(board.horizontal_rows());
        }


        return current_player.play(board);
    }
};
