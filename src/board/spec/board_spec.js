'use strict';
var proxyquire = require('proxyquire'),
    playerConstants = require('../../player/constants'),
    x = playerConstants.X,
    o = playerConstants.O,
    Board;

describe('Board', function() {
    beforeEach(function() {
        Board = require('../board');
    });

    describe('instantiation', function() {
        it('returns an object on new', function() {
            var board = new Board();

            expect(board instanceof Object).toBe(true);
        });

        it('takes an array of values to populate the cells', function() {
            var board = new Board([x, o, x]);

            expect(board.get(1)).toEqual(x);
            expect(board.get(2)).toEqual(o);
            expect(board.get(3)).toEqual(x);
        });
    });

    describe('CELL_COUNT', function() {
        it('exposes cell count', function() {
            var board = new Board();

            expect(board.CELL_COUNT).toBe(9);
        });
    });

    describe('allRows', function() {
        it('gets all the rows on the board', function() {
            var board = new Board();

            expect(board.allRows().length).toBe(8);
        });
    });

    describe('emptyCells', function() {
        it('returns all cell numbers on an empty board', function() {
            var board = new Board();

            expect(board.emptyCells()).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        });

        it('does not return cell numbers that have been played', function() {
            var board = new Board();
            board.set(5, x);

            expect(board.emptyCells()).toEqual([1, 2, 3, 4, 6, 7, 8, 9]);
        });
    });

    describe('get', function() {
        it('returns undefined for an unset cell', function() {
            var board = new Board();

            expect(board.get(1)).toBe(undefined);
        });

        it('returns the value for a set cell', function() {
            var board = new Board([x, o]);

            expect(board.get(1)).toBe(x);
            expect(board.get(2)).toBe(o);
        });
    });

    describe('horizontalRows', function() {
        it('asks the grid for the horizontal rows', function() {
            var horizontalRowsSpy = jasmine.createSpy('horizontalRows');
            Board = proxyquire('../board', {
                '../grid/grid': function() {
                    return {
                        horizontalRows: horizontalRowsSpy
                    };
                }
            });

            var board = new Board();
            board.horizontalRows();

            expect(horizontalRowsSpy).toHaveBeenCalled();
        });
    });

    describe('isFull', function() {
        it('returns false on an empty board', function() {
            var board = new Board();

            expect(board.isFull()).toBe(false);
        });

        it('returns true on a full board', function() {
            var board = new Board([
                x, o, x,
                x, o, x,
                o, x, o
            ]);

            expect(board.isFull()).toBe(true);
        });
    });

    describe('set', function() {
        it('can set an empty cell to a value', function() {
            var board = new Board();

            board.set(1, x);

            expect(board.get(1)).toBe(x);
        });

        it('returns an Error if a cell already has a value', function() {
            var board = new Board([x]);

            expect(board.set(1, o)).toMatch(new Error('Cannot set a cell that already has a value'));
        });
    });

    describe('unset', function() {
        it('can set a cell back to undefined', function() {
            var board = new Board([x]);

            expect(board.get(1)).toBe(x);
            board.unset(1);

            expect(board.get(1)).toBe(undefined);
        });
    });
});
