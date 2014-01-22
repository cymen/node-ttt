'use strict';
var Grid = require('../src/grid');

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

    it('returns the horizontal rows', function() {
        var values = [
          'a', 'b', 'c',
          'd', 'e', 'f',
          'h', 'i', 'j'
        ];

        var grid = new Grid(3, values);

        expect(grid.horizontal_rows()).toContain(['a', 'b', 'c'], ['d', 'e', 'f'], ['h', 'i', 'j']);
    });

    it('returns the vertical rows', function() {
        var values = [
          'a', 'b', 'c',
          'd', 'e', 'f',
          'h', 'i', 'j'
        ];

        var grid = new Grid(3, values);

        expect(grid.vertical_rows()).toContain(['a', 'd', 'h'], ['b', 'e', 'i'], ['c', 'f', 'j']);
    });
});
