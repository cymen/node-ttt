'use strict';

var view = require('../view');

describe('view', function() {
    it('can format header row', function() {
        expect(view.header([1, 2, 3])).toBe('1    |2    |3');
    });

    it('can view a divider', function() {
        expect(view.divider()).toBe('_____|_____|_____');
    });

    it('can view a footer', function() {
        expect(view.footer()).toBe('     |     |     ');
    });

    it('can view a row', function() {
        expect(view.row(['a', 'b', 'c'])).toBe('  a  |  b  |  c  ');
    });

    it('can view a row with missing entries', function() {
        expect(view.row(['a', , 'c'])).toBe('  a  |     |  c  ');
    });

    it('can view a board', function() {
        var result = view.board([
            ['a', 'b', 'c'],
            ['d', 'e', 'f'],
            ['g', 'h', 'i']
        ]);

        expect(result).toMatch(
            '1    | 2   |3    \n' +
            '  a  |  b  |  c  \n' +
            '_____|_____|_____\n' +
            '4    | 5   |6    \n' +
            '  d  |  e  |  f  \n' +
            '_____|_____|_____\n' +
            '7    |8    |9    \n' +
            '  g  |  h  |  i  \n' +
            '     |     |     '
        );
    });
});
