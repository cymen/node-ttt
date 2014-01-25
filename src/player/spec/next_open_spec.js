'use strict';

var Board = require('../../board/board'),
    next_open = require('../next_open');

describe('next open player', function() {
    it('picks the first open cell', function(done) {
        next_open
            .play(new Board())
            .then(function(choice) {
                expect(choice).toBe(1);
                done();
            });
    });

    it('has a type of computer', function() {
        expect(next_open.type).toBe('computer');
    });
});
