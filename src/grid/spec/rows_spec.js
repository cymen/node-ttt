'use strict';
var rows = require('../rows');

describe('grid rows (assumes provided array represents a square grid)', function() {
    it('returns diagonal rows', function() {
        var values = [
            'a', 'b', 'c',
            'd', 'e', 'f',
            'g', 'h', 'i'
        ];

        var diagonals = rows.diagonal(values);

        expect(diagonals).toContain(['a', 'e', 'i']);
        expect(diagonals).toContain(['c', 'e', 'g']);
    });

    it('returns an Error if attempting to call diagonal rows on a grid with even length size', function() {
        var values = [
            'a', 'b',
            'c', 'd'
        ];

        expect(rows.diagonal(values)).toMatch(new Error('Cannot determine diagonal rows on a grid with even length sides'));
    });

    it('can get diagonal rows on a larger grid', function() {
        var values = [
            1, 2, 3, 4, 5,
            6, 7, 8, 9, 10,
            11, 12, 13, 14, 15,
            16, 17, 18, 19, 20,
            21, 22, 23, 24, 25
        ];

        var diagonals = rows.diagonal(values);

        expect(diagonals).toContain([1, 7, 13, 19, 25]);
        expect(diagonals).toContain([5, 9, 13, 17, 21]);
    });

    it('returns horizontal rows', function() {
        var values = [
            'a', 'b',
            'c', 'd'
        ];

        var horizontalRows = rows.horizontal(values);

        expect(horizontalRows.length).toBe(2);
        expect(horizontalRows).toContain(['a', 'b']);
        expect(horizontalRows).toContain(['c', 'd']);
    });

    it('returns vertical rows', function() {
        var values = [
            'a', 'b',
            'c', 'd'
        ];

        var verticalRows = rows.vertical(values);

        expect(verticalRows.length).toBe(2);
        expect(verticalRows).toContain(['a', 'c']);
        expect(verticalRows).toContain(['b', 'd']);
    });

    it('returns all rows', function() {
        var values = [
            'a', 'b', 'c',
            'd', 'e', 'f',
            'g', 'h', 'i'
        ];

        var all = rows.all(values);

        expect(all.length).toBe(3 + 3 + 2);
        []
            .concat(rows.horizontal(values))
            .concat(rows.vertical(values))
            .concat(rows.diagonal(values))
            .forEach(function(row) {
                expect(all).toContain(row);
            });
    });
});
