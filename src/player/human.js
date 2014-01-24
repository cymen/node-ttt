'use strict';

var Q = require('q'),
    prompter = require('single-prompt');

module.exports = {
    play: function(choices) {
        return prompter.prompt('Choose a space', choices);
    }
};
