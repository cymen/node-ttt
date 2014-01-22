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

        expect(rows.horizontal(values)).toContain(['a', 'b'], ['c', 'd']);
    });

    it('returns vertical rows', function() {
        var values = [
            'a', 'b',
            'c', 'd'
        ];

        expect(rows.vertical(values)).toContain(['a', 'c'], ['b', 'd']);
    });
});
