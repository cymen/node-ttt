'use strict';

describe('next open player', function() {
    var next_open = require('../next_open');

    it('picks the first open cell', function(done) {
        next_open
            .play([1, 2, 3])
            .then(function(choice) {
                expect(choice).toBe(1);
                done();
            });
    });
});
