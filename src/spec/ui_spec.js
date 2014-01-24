'use strict';

var prompter = require('single-prompt');

describe('user interface', function() {
    var ui = require('../ui');

    beforeEach(function() {
        spyOn(console, 'log');
    });

    describe('greeting', function() {
        it('prints the game name', function() {
            ui.greeting();

            expect(console.log).toHaveBeenCalledWith('Tic-Tac-Toe');
        });
    });

    describe('play_again', function() {
        it('asks the player if they would like to play again', function(done) {
            var promise = ui.play_again();

            prompter.fakeKeypress('n');

            promise.then(
                function(choice) {
                    expect(choice).toBe('n');
                    done();
                },
                function() {
                    expect('reject').toBe('not happening');
                }
            );
        });
    });

    describe('player_choice', function() {
        it('prompts the player to choose x or o', function(done) {
            var promise = ui.player_choice();

            prompter.fakeKeypress('o');

            promise.then(
                function(choice) {
                    expect(choice).toBe('o');
                    done();
                },
                function() {
                    expect('reject').toBe('not happening');
                }
            );
        });
    });
});
