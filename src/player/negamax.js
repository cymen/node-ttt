'use strict';

var Q = require('q'),
    constants = require('./constants'),
    scorer = require('../scorer'),
    OPTIMAL_CELLS = [1, 3, 5, 7, 9];

module.exports = {
    analysis: function(board, player, height) {
        if (scorer.isWon(board)) {
            if (scorer.winner(board) === player) {
                return height;
            } else {
                return -height;
            }
        }

        return 0;
    },

    getBestMoves: function(board) {
        var self = this,
            weights = {},
            myMark = scorer.turn(board),
            bestResult = -Infinity,
            result;

        if (board.emptyCells().length === 9) {
            return OPTIMAL_CELLS;
        }

        board.emptyCells().sort(self.optimalChoiceSorter).forEach(function(cell) {
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

    negamax: function(board, player, height, alpha, beta) {
        var self = this,
            bestWeight = -Infinity,
            playResult,
            sortedChoices;

        if (scorer.isOver(board)) {
            return this.analysis(board, player, height);
        }

        board.emptyCells().sort(self.optimalChoiceSorter).forEach(function(cell) {
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
        return (player === constants.X) ? constants.O : constants.X;
    },

    optimalChoiceSorter: function(a, b) {
        if (OPTIMAL_CELLS.indexOf(a) !== -1 && OPTIMAL_CELLS.indexOf(b) !== -1) {
            return 0;
        } else {
            if (OPTIMAL_CELLS.indexOf(a) !== -1) {
                return -1;
            } else {
                return 1;
            }
        }
    }
};
