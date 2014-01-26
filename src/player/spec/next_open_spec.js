'use strict';

var Board = require('../../board/board'),
    next_open = require('../next_open');

describe('next open player', function() {
    it('picks the first open cell', function(done) {
        var board = new Board();

        var promise = next_open.play(board);

        expect(promise).toHaveBeenResolvedWith(done, function(choice) {
            expect(choice).toBe(1);
        });
    });

    it('has a type of computer', function() {
        expect(next_open.type).toBe('computer');
    });
});
