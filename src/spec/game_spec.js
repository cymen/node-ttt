'use strict';
require('promise-matchers');

var Q = require('q'),
    game = require('../game'),
    Board = require('../board/board'),
    next_open_player = require('../player/next_open'),
    scorer = require('../scorer'),
    playerConstants = require('../player/constants'),
    x = playerConstants.X,
    o = playerConstants.O,
    _;

describe('game', function() {
    it('plays a game with two players', function(done) {
        var player_x = next_open_player,
            player_o = next_open_player,
            board = new Board();

        var promise = game.play(board, player_x, player_o);

        expect(promise).toHaveBeenResolvedWith(done, function() {
            expect(scorer.winner(board)).toBe(x);
            expect(board.horizontal_rows()).toContain([x, o, x]);
            expect(board.horizontal_rows()).toContain([o, x, o]);
            expect(board.horizontal_rows()).toContain([x, _, _]);
        });
    });

    it('prompts x for a cell on an empty board', function(done) {
        var mockPlayer = function() {
            return {
                play: jasmine.createSpy().andCallFake(function(board) {
                    return Q.resolve(board.empty_cells()[0]);
                })
            };
        };
        var player_x = mockPlayer(),
            player_o = mockPlayer(),
            board = new Board();

        var promise = game.get_play(board, player_x, player_o);

        expect(promise).toHaveBeenResolvedWith(done, function(choice) {
            expect(player_x.play).toHaveBeenCalledWith(board);
            expect(choice).toBe(1);
            expect(player_o.play).not.toHaveBeenCalled();
        });
    });
});
