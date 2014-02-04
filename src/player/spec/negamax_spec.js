'use strict';
var negamax = require('../negamax'),
    Board = require('../../board/board'),
    constants = require('../constants'),
    x = constants.X,
    o = constants.O,
    _;

describe('negamax', function() {
    it('can determine the opponent', function() {
        expect(negamax.opponent(x)).toBe(o);
        expect(negamax.opponent(o)).toBe(x);
    });

    describe('analysis', function() {
        it('returns 0 if the board is tied', function() {
            var board = new Board([
                x, o, x,
                o, o, x,
                x, x, o
            ]);

            var result = negamax.analysis(board, x, 5);

            expect(result).toBe(0);
        });

        it('returns negative depth if game is won', function() {
            var player = x,
                board = new Board([
                    x, o, x,
                    o, x, o,
                    x, x, o
                ]),
                depth = 5;

            var result = negamax.analysis(board, depth);

            expect(result).toBe(-5);
        });

        it('returns infinity if the game is not won or lost', function() {
            var player = o,
                board = new Board([
                    x, o, x,
                    _, _, o,
                    x, _, _
                ]),
                depth = 5;

            var result = negamax.analysis(board, depth);

            expect(result).toBe(25);
        });
    });

    describe('getBestMoves', function() {
        it('should always choose one of 1, 3, 5, 7, 9 on an empty board', function() {
            var board = new Board();

            var best_choices = negamax.getBestMoves(board);

            expect(best_choices).toEqual([1, 3, 5, 7, 9]);
        });

        it('blocks a win by opponent', function() {
            var board = new Board([
                _, x, x,
                _, o, x,
                _, _, o
            ]);

            var best_choices = negamax.getBestMoves(board);

            expect(best_choices).toEqual([1]);
        });

        it('blocks a win by opponent', function() {
            var board = new Board([
                x, _, _,
                x, o, _,
                o, _, _
            ]);

            var best_choices = negamax.getBestMoves(board);

            expect(best_choices).toEqual([3]);
        });

        it('attempts to setup a fork', function() {
            var board = new Board([
                x, _, _,
                _, _, _,
                _, _, o
            ]);

            var best_choices = negamax.getBestMoves(board);

            expect(best_choices).toEqual([3, 7]);
        });

        it('goes for the fork', function() {
            var board = new Board([
                x, _, _,
                o, _, _,
                x, _, o
            ]);

            var best_choices = negamax.getBestMoves(board);

            expect(best_choices).toEqual([3]);
        });

        it('picks a win over blocking the opponent', function() {
            var board = new Board([
                x, _, x,
                _, _, _,
                o, _, o
            ]);

            var best_choices = negamax.getBestMoves(board);

            expect(best_choices).toEqual([2]);
        });
    });

    describe('sortChoicesOptimally', function() {
        it('sorts the cell choices with the most winning cells first', function() {});
    });
});
