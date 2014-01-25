'use strict';
require('promise-matchers');

var prompter = require('single-prompt'),
    Board = require('../../board/board'),
    human = require('../human');

describe('human player', function() {
    it('asks the player to pick a cell', function(done) {
        var promise = human.play(new Board());

        prompter.fakeKeypress(5);

        expect(promise).toHaveBeenResolvedWith(done, function(choice) {
            expect(choice).toBe(5);
            done();
        });
    });

    it('has type of human', function() {
        expect(human.type).toBe('human');
    });
});
