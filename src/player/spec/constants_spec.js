'use strict';
var constants = require('../constants');

describe('constants', function() {
    it('does not have X to be the same value as O', function() {
        expect(constants.X).not.toBe(constants.O);
    });
});
