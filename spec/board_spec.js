'use strict';
var Board = require('../src/board');

describe('Board', function() {
    describe('instantiation', function() {
        it('returns an object on new', function() {
            var board = new Board();

            expect(board instanceof Object).toBe(true);
        });

        it('takes an array of values to populate the cells', function() {
            var board = new Board(['x', 'o', 'x']);

            expect(board.cells()).toEqual(['x', 'o', 'x']);
        });
    });

    describe('cells', function() {
        it('returns an array of cell values', function() {
            var board = new Board(['x', 'o']);

            expect(board.cells()).toEqual(['x', 'o']);
        });

        it('does not allow modification of the inner board state', function() {
            var board = new Board(['x']);

            expect(board.cells()).toEqual(['x']);
            var cells = board.cells();
            cells[0] = 'o';
            expect(cells).toEqual(['o']);

            expect(board.cells()).toEqual(['x']);
        });
    });

    describe('open', function() {
        it('returns all cell numbers on a new board', function() {
            var board = new Board();

            expect(board.open().length).toBe(9);
            expect(board.open()).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        });

        it('returns the open cell numbers on a partially populated board', function() {
            var board = new Board(['x', 'o', 'x']);

            expect(board.open()).toEqual([4, 5, 6, 7, 8, 9]);
        });
    });

    describe('get', function() {
        it('returns undefined for an unset cell', function() {
            var board = new Board();

            expect(board.get(1)).toBe(undefined);
        });

        it('returns the value for a set cell', function() {
            var board = new Board(['x', 'o']);

            expect(board.get(1)).toBe('x');
            expect(board.get(2)).toBe('o');
        });
    });

    describe('set', function() {
        it('can set an empty cell to a value', function() {
            var board = new Board();

            board.set(1, 'x');

            expect(board.get(1)).toBe('x');
        });

        it('returns an Error if a cell already has a value', function() {
            var board = new Board(['x']);

            expect(board.set(1, 'o')).toMatch(new Error('Cannot set a cell that already has a value'));
        });
    });
});
