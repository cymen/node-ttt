'use strict';
var computer = require('../computer'),
    Board = require('../../board/board'),
    ___;

describe('computer', function() {
    it('has a type', function() {
        expect(computer.type).toBe('computer');
    });

    it('can determine the opponent', function() {
        expect(computer.opponent('x')).toBe('o');
        expect(computer.opponent('o')).toBe('x');
    });

    it('returns a promise', function(done) {
        var board = new Board([
            'x', 'o', 'x',
            'o', ___, ___,
            'x', ___, 'o'
        ]);

        var promise = computer.play(board);

        promise.then(
            function(move) {
                expect(move).toBe(5);
                done();
            },
            function() {
                expect('promise').toBe('resolved');
                done();
            }
        );
    });

    describe('best_choices', function() {
        it('should always choose one of 1, 3, 5, 7, 9 on an empty board', function() {
            var board = new Board();

            var best_choices = computer.get_best_moves(board);

            expect(best_choices).toEqual([1, 3, 5, 7, 9]);
        });

        it('blocks a win by opponent', function() {
            var board = new Board([
                ___, 'x', 'x',
                ___, 'o', 'x',
                ___, ___, 'o'
            ]);

            var best_choices = computer.get_best_moves(board);

            expect(best_choices).toEqual([1]);
        });

        it('blocks a win by opponent', function() {
            var board = new Board([
                'x', ___, ___,
                'x', 'o', ___,
                'o', ___, ___
            ]);

            var best_choices = computer.get_best_moves(board);

            expect(best_choices).toEqual([3]);
        });

        it('attempts to setup a fork', function() {
            var board = new Board([
                'x', ___, ___,
                ___, ___, ___,
                ___, ___, 'o'
            ]);

            var best_choices = computer.get_best_moves(board);

            expect(best_choices).toEqual([3, 7]);
        });

        it('goes for the fork', function() {
            var board = new Board([
                'x', ___, ___,
                'o', ___, ___,
                'x', ___, 'o'
            ]);

            var best_choices = computer.get_best_moves(board);

            expect(best_choices).toEqual([3]);
        });

        it('picks a win over blocking the opponent', function() {
            var board = new Board([
                'x', ___, 'x',
                ___, ___, ___,
                'o', ___, 'o'
            ]);

            var best_choices = computer.get_best_moves(board);

            expect(best_choices).toEqual([2]);
        });
    });
});
