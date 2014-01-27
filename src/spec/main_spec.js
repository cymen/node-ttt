'use strict';
require('promise-matchers');

var Q = require('q'),
    proxyquire = require('proxyquire'),
    human = require('../player/human'),
    computer = require('../player/computer'),
    playerConstants = require('../player/constants'),
    x = playerConstants.X,
    o = playerConstants.O;

describe('main', function() {
    var makeMain,
        mockGame,
        mockUI;

    beforeEach(function() {
        mockGame = {
            play: jasmine.createSpy('game.play').andReturn(Q.resolve())
        };

        mockUI = {
            greeting: jasmine.createSpy('ui.greeting'),
            playerChoice: jasmine.createSpy('ui.playerChoice'),
            playAgain: jasmine.createSpy('ui.playAgain').andReturn(Q.resolve(false))
        };

        makeMain = function() {
            return proxyquire('../main', {
                './game': mockGame,
                './ui': mockUI
            });
        };

        spyOn(process, 'exit');
    });

    it('asks ui to display greeting', function() {
        var main = makeMain();

        expect(mockUI.greeting).toHaveBeenCalled();
    });

    it('asks the player to choose x or o and starts game with computer as opposite player', function(done) {
        mockUI.playerChoice.andReturn(Q.resolve(o));

        var promise = makeMain();

        expect(promise).toHaveBeenResolvedWith(done, function() {
            expect(mockUI.playerChoice).toHaveBeenCalled();
            expect(mockGame.play).toHaveBeenCalledWith(jasmine.any(Object), computer, human);
        });
    });

    it('prompts the player to play again after the game is finished', function(done) {
        mockUI.playerChoice.andReturn(Q.resolve(x));

        var promise = makeMain();

        expect(promise).toHaveBeenResolvedWith(done, function() {
            expect(mockUI.playAgain).toHaveBeenCalled();
        });
    });

    it('calls process.exit to end the game', function(done) {
        mockUI.playerChoice.andReturn(Q.resolve(x));

        var promise = makeMain();

        expect(promise).toHaveBeenResolvedWith(done, function() {
            expect(process.exit).toHaveBeenCalled();
        });
    });
});
