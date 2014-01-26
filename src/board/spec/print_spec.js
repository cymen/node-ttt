'use strict';

var print = require('../print');

describe('printer', function() {
    beforeEach(function() {
        spyOn(console, 'log');
    });

    it('can print a header row', function() {
        print.header([1, 2, 3]);

        expect(console.log).toHaveBeenCalledWith('1    |2    |3');
    });

    it('can print a divider', function() {
        print.divider();

        expect(console.log).toHaveBeenCalledWith('_____|_____|_____');
    });

    it('can print a footer', function() {
        print.footer();

        expect(console.log).toHaveBeenCalledWith('     |     |     ');
    });

    it('can print a row', function() {
        print.row(['a', 'b', 'c']);

        expect(console.log).toHaveBeenCalledWith('  a  |  b  |  c  ');
    });

    it('can print a row with missing entries', function() {
        print.row(['a', , 'c']);

        expect(console.log).toHaveBeenCalledWith('  a  |     |  c  ');
    });

    it('can print a board', function() {
        var output = [];
        console.log.andCallFake(function(line) {
            output.push(line);
        });

        print.board([
            ['a', 'b', 'c'],
            ['d', 'e', 'f'],
            ['g', 'h', 'i']
        ]);

        expect(output.join("\n")).toMatch(
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
