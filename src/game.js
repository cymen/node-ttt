'use strict';

var Board = require('./board/board'),
    boardPrint = require('./board/print');

var board = new Board();
boardPrint.rows(board.horizontal_rows());
