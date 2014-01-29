'use strict';

var Q = require('q'),
    negamax = require('./negamax');

module.exports = {
    play: function(board) {
        var moves = negamax.getBestMoves(board),
            random = Math.floor(Math.random() * moves.length);

        return Q.resolve(moves[random]);
    },


    type: 'computer'
};
