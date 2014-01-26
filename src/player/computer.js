'use strict';
var Q = require('q'),
    scorer = require('../scorer'),
    OPTIMAL_CELLS = [1, 3, 5, 7, 9];

module.exports = {
    play: function(board) {
        var moves = this.get_best_moves(board),
            move = moves[Math.floor(Math.random() * moves.length)];
        return Q.resolve(move);
    },

    get_best_moves: function(board) {
        var self = this,
            weights = {},
            myMark = scorer.turn(board),
            bestResult = -Infinity,
            result,
            move;

        if (board.empty_cells().length === 9) {
            return OPTIMAL_CELLS;
        }

        board.empty_cells().forEach(function(cell) {
            board.set(cell, myMark);

            result = -self.negamax(board, self.opponent(myMark), board.CELL_COUNT, -Infinity, Infinity);
            if (result > bestResult) {
                bestResult = result;
            }
            if (weights[result]) {
                weights[result].push(cell);
            } else {
                weights[result] = [cell];
            }

            board.unset(cell);
        });

        return weights[bestResult];
    },

    analysis: function(board, player, height) {
        if (scorer.is_won(board)) {
            if (scorer.winner(board) === player) {
                return height;
            } else {
                return -height;
            }
        }

        return 0;
    },

    negamax: function(board, player, height, alpha, beta) {
        var self = this,
            bestWeight = -Infinity,
            playResult,
            endingPlayer;

        if (scorer.is_over(board)) {
            return this.analysis(board, player, height);
        }

        board.empty_cells().forEach(function(cell) {
            board.set(cell, player);

            playResult = -self.negamax(board, self.opponent(player), height - 1, -beta, -alpha);

            board.unset(cell);

            bestWeight = Math.max(playResult, bestWeight);

            if (playResult > alpha) {
                alpha = playResult;
            }

            if (alpha >= beta) {
                return alpha;
            }

        });

        return bestWeight;
    },

    opponent: function(player) {
        return (player === 'x') ? 'o' : 'x';
    },

    type: 'computer'
};
