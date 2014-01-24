'use strict';

var Q = require('q'),
    prompter = require('single-prompt');

module.exports = {
    play: function(choices) {
        return Q.promise(function(resolve) {
            prompter
                .prompt('Choose a space', choices)
                .then(resolve);
        });
    }
};
