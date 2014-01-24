'use strict';
var proxyquire = require('proxyquire');

describe('Board', function() {
    var Board;

    beforeEach(function() {
        Board = require('../board');
    });

    describe('instantiation', function() {
        it('returns an object on new', function() {
            var board = new Board();

            expect(board instanceof Object).toBe(true);
        });

        it('takes an array of values to populate the cells', function() {
            var board = new Board(['x', 'o', 'x']);

            expect(board.get(1)).toEqual('x');
            expect(board.get(2)).toEqual('o');
            expect(board.get(3)).toEqual('x');
        });
    });

    describe('all_rows', function() {
        it('gets all the rows on the board', function() {
            var board = new Board();

            expect(board.all_rows().length).toBe(8);
        });
    });

    describe('empty_cells', function() {
        it('returns all cell numbers on an empty board', function() {
            var board = new Board();

            expect(board.empty_cells()).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        });

        it('does not return cell numbers that have been played', function() {
            var board = new Board();
            board.set(5, 'x');

            expect(board.empty_cells()).toEqual([1, 2, 3, 4, 6, 7, 8, 9]);
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

    describe('horizontal_rows', function() {
        it('asks the grid for the horizontal rows', function() {
            var horizontal_rows_spy = jasmine.createSpy('horizontal_rows');
            Board = proxyquire('../board', {
                '../grid/grid': function() {
                    return {
                        horizontal_rows: horizontal_rows_spy
                    };
                }
            });

            var board = new Board();
            board.horizontal_rows();

            expect(horizontal_rows_spy).toHaveBeenCalled();
        });
    });

    describe('is_full', function() {
        it('returns false on an empty board', function() {
            var board = new Board();

            expect(board.is_full()).toBe(false);
        });

        it('returns true on a full board', function() {
            var board = new Board([
                'x', 'o', 'x',
                'x', 'o', 'x',
                'o', 'x', 'o'
            ]);

            expect(board.is_full()).toBe(true);
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
