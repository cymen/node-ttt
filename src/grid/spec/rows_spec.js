'use strict';
var rows = require('../rows');

describe('grid rows (assumes provided array represents a square grid)', function() {
    it('returns diagonal rows', function() {
        var values = [
            'a', 'b', 'c',
            'd', 'e', 'f',
            'g', 'h', 'i'
        ];

        expect(rows.diagonal(values)).toContain(['a', 'e', 'i'], ['c', 'e', 'g']);
    });

    it('returns an Error if attempting to call diagonal rows on a grid with even length size', function() {
        var values = [
            'a', 'b',
            'c', 'd'
        ];

        expect(rows.diagonal(values)).toMatch(new Error('Cannot determine diagonal rows on a grid with even length sides'));
    });

    it('returns horizontal rows', function() {
        var values = [
            'a', 'b',
            'c', 'd'
        ];

        var horizontal_rows = rows.horizontal(values);

        expect(horizontal_rows.length).toBe(2);
        expect(horizontal_rows).toContain(['a', 'b'], ['c', 'd']);
    });

    it('returns vertical rows', function() {
        var values = [
            'a', 'b',
            'c', 'd'
        ];

        var vertical_rows = rows.vertical(values);

        expect(vertical_rows.length).toBe(2);
        expect(vertical_rows).toContain(['a', 'c'], ['b', 'd']);
    });

    it('returns all rows', function() {
        var values = [
            'a', 'b', 'c',
            'd', 'e', 'f',
            'g', 'h', 'i'
        ];

        var all = rows.all(values);

        expect(all.length).toBe(3 + 3 + 2);
        expect(all).toContain(['a', 'b', 'c'], ['d', 'e', 'f'], ['g', 'h', 'i']);
        expect(all).toContain(['a', 'd', 'g'], ['b', 'e', 'h'], ['c', 'f', 'i']);
        expect(all).toContain(['a', 'e', 'i'], ['c', 'e', 'g']);
    });
});
