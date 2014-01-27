'use strict';
require('promise-matchers');

var prompter = require('single-prompt'),
    proxyquire = require('proxyquire'),
    ui = require('../ui'),
    playerConstants = require('../player/constants'),
    x = playerConstants.X,
    o = playerConstants.O;

describe('user interface', function() {
    beforeEach(function() {
        spyOn(console, 'log');
    });

    describe('ending', function() {
        it('prints the board and the ending', function() {
            var rowsSpy = jasmine.createSpy().andReturn([]);

            ui.ending({
                horizontalRows: rowsSpy
            }, 'abc is xyz!');

            expect(console.log).toHaveBeenCalledWith('abc is xyz!');
            expect(rowsSpy).toHaveBeenCalled();
        });
    });

    describe('greeting', function() {
        it('prints the game name', function() {
            ui.greeting();

            expect(console.log).toHaveBeenCalledWith('Tic-Tac-Toe');
        });
    });

    describe('playAgain', function() {
        it('asks the player if they would like to play again', function(done) {
            var promise = ui.playAgain();

            prompter.fakeKeypress('n');

            expect(promise).toHaveBeenResolvedWith(done, function(choice) {
                expect(choice).toBe(false);
            });
        });

        it('exits the game if the player presses ctrl-c', function(done) {
            spyOn(process, 'exit');
            var promise = ui.playAgain();

            prompter.fakeKeypress('c', {
                name: 'c',
                ctrl: true
            });

            expect(promise).toHaveBeenResolvedWith(done, function() {
                expect(process.exit).toHaveBeenCalledWith(1);
            });
        });
    });

    describe('playerChoice', function() {
        it('prompts the player to choose x or o', function(done) {
            var promise = ui.playerChoice();

            prompter.fakeKeypress(o);

            expect(promise).toHaveBeenResolvedWith(done, function(choice) {
                expect(choice).toBe(o);
            });
        });

        it('exits the game if the player presses ctrl-c', function(done) {
            spyOn(process, 'exit');
            var promise = ui.playerChoice();

            prompter.fakeKeypress('c', {
                name: 'c',
                ctrl: true
            });

            expect(promise).toHaveBeenResolvedWith(done, function() {
                expect(process.exit).toHaveBeenCalledWith(1);
            });
        });
    });

    describe('getPlayerMove', function() {
        it('prompts the player to choose a cell', function(done) {
            var promise = ui.getPlayerMove([1, 2, 3]);

            prompter.fakeKeypress(3);

            expect(promise).toHaveBeenResolvedWith(done, function(key) {
                expect(key).toBe(3);
            });
        });

        it('exits the game if the player presses ctrl-c', function(done) {
            spyOn(process, 'exit');
            var promise = ui.getPlayerMove([1, 2, 3]);

            prompter.fakeKeypress('c', {
                name: 'c',
                ctrl: true
            });

            expect(promise).toHaveBeenResolvedWith(done, function() {
                expect(process.exit).toHaveBeenCalledWith(1);
            });
        });
    });

    describe('printBoard', function() {
        it('gets the rows from the board', function() {
            var rowsSpy = jasmine.createSpy().andReturn([]);

            ui.printBoard({
                horizontalRows: rowsSpy
            });

            expect(rowsSpy).toHaveBeenCalled();
        });

        it('prints the view', function() {
            var rowsSpy = jasmine.createSpy().andReturn([]),
                viewBoardSpy = jasmine.createSpy().andReturn('THE VIEW');
            var ui = proxyquire('../ui', {
                './board/view': {
                    board: viewBoardSpy
                }
            });

            ui.printBoard({
                horizontalRows: rowsSpy
            });

            expect(console.log).toHaveBeenCalledWith('THE VIEW');
        });
    });
});
