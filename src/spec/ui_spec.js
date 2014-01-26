'use strict';

var prompter = require('single-prompt'),
    proxyquire = require('proxyquire'),
    ui = require('../ui');

describe('user interface', function() {
    beforeEach(function() {
        spyOn(console, 'log');
    });

    describe('ending', function() {
        it('prints the board and the ending', function() {
            var rowsSpy = jasmine.createSpy().andReturn([]);

            ui.ending({
                horizontal_rows: rowsSpy
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

    describe('print_board', function() {
        it('gets the rows from the board', function() {
            var rowsSpy = jasmine.createSpy().andReturn([]);

            ui.print_board({
                horizontal_rows: rowsSpy
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
                horizontal_rows: rowsSpy
            });

            expect(console.log).toHaveBeenCalledWith('THE VIEW');
        });
    });
});
