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

    describe('play_again', function() {
        it('asks the player if they would like to play again', function(done) {
            var promise = ui.play_again();

            prompter.fakeKeypress('n');

            expect(promise).toHaveBeenResolvedWith(done, function(choice) {
                expect(choice).toBe(false);
            });
        });

        it('exits the game if the player presses ctrl-c', function(done) {
            spyOn(process, 'exit');
            var promise = ui.play_again();

            prompter.fakeKeypress('c', {
                name: 'c',
                ctrl: true
            });

            expect(promise).toHaveBeenResolvedWith(done, function() {
                expect(process.exit).toHaveBeenCalledWith(1);
            });
        });
    });

    describe('player_choice', function() {
        it('prompts the player to choose x or o', function(done) {
            var promise = ui.player_choice();

            prompter.fakeKeypress(o);

            expect(promise).toHaveBeenResolvedWith(done, function(choice) {
                expect(choice).toBe(o);
            });
        });

        it('exits the game if the player presses ctrl-c', function(done) {
            spyOn(process, 'exit');
            var promise = ui.player_choice();

            prompter.fakeKeypress('c', {
                name: 'c',
                ctrl: true
            });

            expect(promise).toHaveBeenResolvedWith(done, function() {
                expect(process.exit).toHaveBeenCalledWith(1);
            });
        });
    });

    describe('player_choose_cell', function() {
        it('prompts the player to choose a cell', function(done) {
            var promise = ui.player_choose_cell([1, 2, 3]);

            prompter.fakeKeypress(3);

            expect(promise).toHaveBeenResolvedWith(done, function(key) {
                expect(key).toBe(3);
            });
        });

        it('exits the game if the player presses ctrl-c', function(done) {
            spyOn(process, 'exit');
            var promise = ui.player_choose_cell([1, 2, 3]);

            prompter.fakeKeypress('c', {
                name: 'c',
                ctrl: true
            });

            expect(promise).toHaveBeenResolvedWith(done, function() {
                expect(process.exit).toHaveBeenCalledWith(1);
            });
        });
    });

    describe('print_board', function() {
        it('gets the rows from the board', function() {
            var rowsSpy = jasmine.createSpy().andReturn([]);

            ui.print_board({
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

            ui.print_board({
                horizontalRows: rowsSpy
            });

            expect(console.log).toHaveBeenCalledWith('THE VIEW');
        });
    });
});
