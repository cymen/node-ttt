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

    it('returns the diagonal rows', function() {
        var values = [
            'a', 'b', 'c',
            'd', 'e', 'f',
            'h', 'i', 'j'
        ];

        var grid = new Grid(3, values);

        expect(grid.diagonal_rows()).toContain(['a', 'e', 'j'], ['c', 'e', 'h']);
    });

    it('returns the diagonal rows for a larger board', function() {
        var values = [
            'a', 'b', 'c', 'd', 'e',
            'f', 'g', 'h', 'i', 'j',
            'k', 'l', 'm', 'n', 'o',
            'p', 'q', 'r', 's', 't',
            'u', 'v', 'w', 'x', 'y'
        ];

        var grid = new Grid(5, values);

        expect(grid.diagonal_rows()).toContain(['a', 'g', 'm', 's', 'y'], ['e', 'i', 'm', 'q', 'u']);
    });

    it('returns an Error if attempting to call diagonal rows on a grid with even length size', function() {
        var values = [
            'a', 'b',
            'c', 'd'
        ];

        var grid = new Grid(2, values);

        expect(grid.diagonal_rows()).toMatch(new Error('Cannot determine diagonal rows on a grid with even length sides'));
    });
});
