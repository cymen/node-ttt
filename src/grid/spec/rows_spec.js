'use strict';
var rows = require('../rows');

describe('grid rows', function() {
    describe('horizontal', function() {
        it('returns rows assuming the array of values is a representation of a grid', function() {
            var values = [
                'a', 'b',
                'c', 'd'
            ];
            expect(rows.horizontal(values)).toContain(['a', 'b'], ['c', 'd']);
        });
    });
});
