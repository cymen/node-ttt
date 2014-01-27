'use strict';

var playerConstants = require('./player/constants'),
    x = playerConstants.X,
    o = playerConstants.O;

module.exports = {
    is_tied: function(board) {
        return board.is_full() && !this.is_won(board);
    },

    is_over: function(board) {
        return this.is_won(board) || this.is_tied(board);
    },

    is_won: function(board) {
        return (this.winner(board)) ? true : false;
    },

    row_winner: function(row) {
        var firstValue = row[0],
            length = row.length,
            i;

        for (i = 1; i < length; i++) {
            if (row[i] !== firstValue) {
                return;
            }
        }

        return firstValue;
    },

    turn: function(board) {
        var empty_cell_count = board.empty_cells().length,
            odd_number_of_empty_cells = empty_cell_count % 2 === 1;

        return (odd_number_of_empty_cells) ? x : o;
    },

    winner: function(board) {
        var rows = board.all_rows(),
            length = rows.length,
            i;

        for (i = 0; i < length; i++) {
            var winner = this.row_winner(rows[i]);
            if (winner) {
                return winner;
            }
        }
    }
};
