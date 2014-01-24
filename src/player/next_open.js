'use strict';
var Q = require('q');

module.exports = {
    play: function(choices) {
        return Q.resolve(choices[0]);
    }
};
