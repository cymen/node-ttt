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
