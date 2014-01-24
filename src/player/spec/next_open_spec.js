'use strict';

describe('next open player', function() {
    var next_open = require('../next_open');

    it('picks the first open cell', function() {
        expect(next_open.play([1, 2, 3])).toBe(1);
    });
});
