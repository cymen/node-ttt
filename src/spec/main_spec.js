'use strict';
require('promise-matchers');

var Q = require('q'),
    proxyquire = require('proxyquire'),
    human = require('../player/human'),
    computer = require('../player/computer');

describe('main', function() {
    var makeMain,
        mockGame,
        mockUI;

    beforeEach(function() {
        mockGame = {
            play: jasmine.createSpy('game.play')
        };

        mockUI = {
            greeting: jasmine.createSpy('ui.greeting'),
            player_choice: jasmine.createSpy('ui.player_choice'),
            play_again: jasmine.createSpy('ui.play_again')
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
        var humanPlayerChoice = 'o';
        mockGame.play.andReturn(Q.resolve());
        mockUI.player_choice.andReturn(Q.resolve(humanPlayerChoice));
        mockUI.play_again.andReturn(Q.resolve('n'));

        var promise = makeMain();

        expect(promise).toHaveBeenResolvedWith(done, function() {
            expect(mockUI.player_choice).toHaveBeenCalled();
            expect(mockGame.play).toHaveBeenCalledWith(jasmine.any(Object), computer, human);
        });
    });

    it('prompts the player to play again after the game is finished', function(done) {
        var humanPlayerChoice = 'x';
        mockGame.play.andReturn(Q.resolve());
        mockUI.player_choice.andReturn(Q.resolve(humanPlayerChoice));
        mockUI.play_again.andReturn(Q.resolve('n'));

        var promise = makeMain();

        expect(promise).toHaveBeenResolvedWith(done, function() {
            expect(mockUI.play_again).toHaveBeenCalled();
        });
    });

    it('calls process.exit to end the game', function(done) {
        var humanPlayerChoice = 'x';
        mockGame.play.andReturn(Q.resolve());
        mockUI.player_choice.andReturn(Q.resolve(humanPlayerChoice));
        mockUI.play_again.andReturn(Q.resolve('n'));

        var promise = makeMain();

        expect(promise).toHaveBeenResolvedWith(done, function() {
            expect(mockUI.play_again).toHaveBeenCalled();
        });
    });
});
