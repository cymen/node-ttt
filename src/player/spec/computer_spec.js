'use strict';
var computer = require('../computer'),
    Board = require('../../board/board'),
    constants = require('../constants'),
    x = constants.X,
    o = constants.O,
    _;

describe('computer', function() {
    it('has a type', function() {
        expect(computer.type).toBe('computer');
    });

    it('can determine the opponent', function() {
        expect(computer.opponent(x)).toBe(o);
        expect(computer.opponent(o)).toBe(x);
    });

    it('returns a promise', function(done) {
        var board = new Board([
            x, o, x,
            o, _, _,
            x, _, o
        ]);

        var promise = computer.play(board);

        expect(promise).toHaveBeenResolvedWith(done, function(move) {
            expect(move).toBe(5);
        });
    });

    describe('analysis', function() {
        it('returns 0 if the board is tied', function() {
            var board = new Board([
                x, o, x,
                o, o, x,
                x, x, o
            ]);

            var result = computer.analysis(board, x, 5);

            expect(result).toBe(0);
        });

        it('returns a positive height if player is the winner', function() {
            var player = x,
                board = new Board([
                    x, o, x,
                    o, x, o,
                    x, x, o
                ]),
                height = 5;

            var result = computer.analysis(board, player, height);

            expect(result).toBe(5);
        });

        it('returns a negative height if player is the loser', function() {
            var player = o,
                board = new Board([
                    x, o, x,
                    o, x, o,
                    x, x, o
                ]),
                height = 13;

            var result = computer.analysis(board, player, height);

            expect(result).toBe(-13);
        });
    });

    describe('best_choices', function() {
        it('should always choose one of 1, 3, 5, 7, 9 on an empty board', function() {
            var board = new Board();

            var best_choices = computer.getBestMoves(board);

            expect(best_choices).toEqual([1, 3, 5, 7, 9]);
        });

        it('blocks a win by opponent', function() {
            var board = new Board([
                _, x, x,
                _, o, x,
                _, _, o
            ]);

            var best_choices = computer.getBestMoves(board);

            expect(best_choices).toEqual([1]);
        });

        it('blocks a win by opponent', function() {
            var board = new Board([
                x, _, _,
                x, o, _,
                o, _, _
            ]);

            var best_choices = computer.getBestMoves(board);

            expect(best_choices).toEqual([3]);
        });

        it('attempts to setup a fork', function() {
            var board = new Board([
                x, _, _,
                _, _, _,
                _, _, o
            ]);

            var best_choices = computer.getBestMoves(board);

            expect(best_choices).toEqual([3, 7]);
        });

        it('goes for the fork', function() {
            var board = new Board([
                x, _, _,
                o, _, _,
                x, _, o
            ]);

            var best_choices = computer.getBestMoves(board);

            expect(best_choices).toEqual([3]);
        });

        it('picks a win over blocking the opponent', function() {
            var board = new Board([
                x, _, x,
                _, _, _,
                o, _, o
            ]);

            var best_choices = computer.getBestMoves(board);

            expect(best_choices).toEqual([2]);
        });
    });
});
