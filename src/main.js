'use strict';

var Q = require('q'),
    Board = require('./board/board'),
    ui = require('./ui'),
    game = require('./game'),
    human = require('./player/human'),
    computer = require('./player/computer');

ui.greeting();

var loop = function() {
    return Q.promise(function(resolve) {
        ui
            .player_choice()
            .then(function(choice) {
                var board = new Board(),
                    player_x,
                    player_o;

                if (choice === 'x') {
                    player_x = human;
                    player_o = computer;
                } else {
                    player_x = computer;
                    player_o = human;
                }

                game
                    .play(board, player_x, player_o)
                    .then(function() {
                        ui
                            .play_again()
                            .then(function(playAgain) {
                                if (playAgain) {
                                    resolve(loop());
                                } else {
                                    resolve();
                                }
                            });
                    });
            });
    });
};

module.exports = loop().then(function() {
    process.exit(0);
});
