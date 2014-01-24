'use strict';

module.exports = {
    is_tied: function(board) {
        return board.is_full() && !this.is_won(board);
    },

    is_over: function(board) {
        return this.is_won(board) || this.is_tied(board);
    },

    is_won: function(board) {
        var winner = this.winner(board);
        if (winner) {
            return true;
        } else {
            return false;
        }
    },

    row_winner: function(row) {
        var firstValue = row[0];
        for (var i = 1, length = row.length; i < length; i++) {
            if (row[i] !== firstValue) {
                return;
            }
        }
        return firstValue;
    },

    winner: function(board) {
        var rows = board.all_rows();
        for (var i = 0, length = rows.length; i < length; i++) {
            var winner = this.row_winner(rows[i]);
            if (winner) {
                return winner;
            }
        }
    }
};
