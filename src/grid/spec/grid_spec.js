'use strict';
var proxyquire = require('proxyquire'),
    Grid = require('../grid');

describe('grid', function() {
    it('is instantiated with a side length', function() {
        var grid = new Grid(3);

        expect(grid.size()).toBe(9);
    });

    it('can be instantiated with an array of cell values', function() {
        var values = [
            'a', 'b', 'c',
            'd', 'e', 'f',
            'h', 'i', 'j'
        ];

        var grid = new Grid(3, values);

        expect(grid.cells()).toEqual(values);
    });

    it('can get a cell identified by a one-based index', function() {
        var values = [
            'a', 'b', 'c',
            'd', 'e', 'f',
            'h', 'i', 'j'
        ];

        var grid = new Grid(3, values);

        expect(grid.get(5)).toEqual('e');
    });

    it('can set a cell to a value identifed by one-based index', function() {
        var grid = new Grid(1);

        grid.set(1, 'x');

        expect(grid.rows()).toContain(['x']);
    });

    it('can set a cell to a value even if it already has a value', function() {
        var grid = new Grid(1, ['o']);

        expect(grid.get(1)).toEqual('o');
        grid.set(1, 'x');

        expect(grid.get(1)).toEqual('x');
    });

    it('returns an array of indexes for cells without values', function() {
        var grid = new Grid(3);

        expect(grid.open()).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });

    it('correctly identifies a cell set to false to have a value', function() {
        var grid = new Grid(1, ['x']);

        expect(grid.open()).toEqual([]);
    });

    describe('rows', function() {
        var mockRows;

        beforeEach(function() {
            mockRows = {
                all: jasmine.createSpy('all'),
                diagonal: jasmine.createSpy('diagonal'),
                horizontal: jasmine.createSpy('horizontal'),
                vertical: jasmine.createSpy('vertical')
            };

            Grid = proxyquire('../grid', {
                './rows': mockRows
            });
        });

        it('asks rows for the horizontal rows', function() {
            var grid = new Grid(3);

            grid.horizontal_rows();

            expect(mockRows.horizontal).toHaveBeenCalled();
        });

        it('asks rows for the vertical rows', function() {
            var grid = new Grid(3);

            grid.vertical_rows();

            expect(mockRows.vertical).toHaveBeenCalled();
        });

        it('asks rows for the diagonal rows', function() {
            var grid = new Grid(3);

            grid.diagonal_rows();

            expect(mockRows.diagonal).toHaveBeenCalled();
        });

        it('asks rows for all of the rows', function() {
            var grid = new Grid(3);

            grid.rows();

            expect(mockRows.all).toHaveBeenCalled();
        });
    });
});
