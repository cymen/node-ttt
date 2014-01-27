'use strict';
var scorer = require('../scorer'),
    Board = require('../board/board'),
    playerConstants = require('../player/constants'),
    x = playerConstants.X,
    o = playerConstants.O;

describe('scorer', function() {
    describe('isTied', function() {
        it('can identify a board as tied', function() {
            var board = new Board([
                x, o, x,
                o, x, o,
                o, x, o
            ]);

            expect(scorer.isTied(board)).toBe(true);
        });

        it('does not see a won board as tied', function() {
            var board = new Board([
                x, x, x,
                o, x, o,
                o, x, o
            ]);

            expect(scorer.isTied(board)).toBe(false);
        });
    });

    describe('isOver', function() {
        it('does not see an empty board as over', function() {
            expect(scorer.isOver(new Board())).toBe(false);
        });

        it('identifies a won game is over', function() {
            var board = new Board([
                x, o, x,
                o, x, o,
                o, x, o
            ]);

            expect(scorer.isOver(board)).toBe(true);
        });

        it('identifies a tied game as over', function() {
            var board = new Board([
                x, o, x,
                o, x, o,
                o, x, o
            ]);

            expect(scorer.isOver(board)).toBe(true);
        });
    });

    it('can identify a board as won', function() {
        var board = new Board([x, x, x]);

        expect(scorer.isWon(board)).toBe(true);
    });

    describe('rowWinner', function() {
        it('can identify the winner of a row', function() {
            var row = [x, x, x];

            expect(scorer.rowWinner(row)).toBe(x);
        });

        it('returns undefined if there is no winner for a row', function() {
            expect(scorer.rowWinner([x, o, x])).toBeUndefined();
            expect(scorer.rowWinner([x, , x])).toBeUndefined();
        });

        it('works on any length row', function() {
            expect(scorer.rowWinner([x])).toBe(x);
            expect(scorer.rowWinner([x, x])).toBe(x);
            expect(scorer.rowWinner([x, x, x])).toBe(x);
            expect(scorer.rowWinner([x, x, x, x, x, x, x, x])).toBe(x);
        });

        it('works correctly on an empty row', function() {
            expect(scorer.rowWinner([, , , ])).toBeUndefined();
            expect(scorer.rowWinner([undefined, undefined, undefined])).toBeUndefined();
        });
    });

    describe('turn', function() {
        it('is x for an empty board', function() {
            var board = new Board();

            expect(scorer.turn(board)).toBe(x);
        });

        it('identifies the correct player for a partially played board', function() {
            var board = new Board([x, o, x]);

            expect(scorer.turn(board)).toBe(o);
        });
    });

    describe('winner', function() {
        it('identifies the winner of a board', function() {
            var board = new Board([
                x, x, x,
                o, o, x,
                o, x, o
            ]);

            expect(scorer.winner(board)).toBe(x);
        });
    });
});
