var negamax = require('./negamax');

module.exports = {
  getBestMoves: function(board) {
      var boardAsArray = [],
          i,
          length,
          moves;

      board.horizontalRows().map(function(row) {
        boardAsArray = boardAsArray.concat(row);
      });

      moves = negamax.getBestMoves(boardAsArray);
      length = moves.length;
      for (i=0; i < length; i++) {
        moves[i] += 1;
      }

      return moves;
  }
};
