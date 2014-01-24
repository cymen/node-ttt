'use strict';
require('promise-matchers');

var prompter = require('single-prompt');

describe('human player', function() {
    var human = require('../human');

    it('asks the player to pick a cell', function(done) {
        var promise = human.play([3, 5, 6]);

        prompter.fakeKeypress(5);

        expect(promise).toHaveBeenResolvedWith(done, function(choice) {
            expect(choice).toBe(5);
            done();
        });
    });
});
