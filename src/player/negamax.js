'use strict';

var Q = require('q'),
    constants = require('./constants'),
    scorer = require('../scorer');

module.exports = {
    analysis: function(board, depth) {
        if (scorer.isWon(board)) {
            return -depth;
        }

        if (scorer.isTied(board)) {
            return 0;
        }

        return Infinity;
    },

    getBestMoves: function(board) {
        var self = this,
            weights = {},
            myMark = scorer.turn(board),
            bestResult = -Infinity,
            result;

        board.emptyCells().forEach(function(cell) {
            board.set(cell, myMark);

            result = -self.negamax(board, self.opponent(myMark), 1, -Infinity, Infinity);

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

    negamax: function(board, player, depth, alpha, beta) {
        var self = this,
            bestWeight = -Infinity,
            playResult;

        if (scorer.isOver(board) || depth > 6) {
            return this.analysis(board, depth);
        }

        board.emptyCells().forEach(function(cell) {
            board.set(cell, player);

            playResult = -self.negamax(board, self.opponent(player), depth + 1, -beta, -alpha);

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
    }
};
