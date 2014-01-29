'use strict';
var computer = require('../computer'),
    Board = require('../../board/board'),
    constants = require('../constants'),
    x = constants.X,
    o = constants.O,
    _;

describe('computer', function() {
    it('has a type', function() {
        expect(computer.type).toBe('computer');
    });

    it('returns a promise', function(done) {
        var board = new Board([
            x, o, x,
            o, _, _,
            x, _, o
        ]);

        var promise = computer.play(board);

        expect(promise).toHaveBeenResolvedWith(done, function(move) {
            expect(move).toBe(5);
        });
    });
});
