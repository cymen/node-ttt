# Tic-Tac-Toe [![Build Status](https://travis-ci.org/cymen/node-ttt.png?branch=master)](https://travis-ci.org/cymen/node-ttt)

## Initial setup

### Install Node.js

I used homebrew on OSX:

    brew install nodejs

See the Node.js website for other ways to install it.

### Clone the repo

    git clone git@github.com:cymen/node-ttt.git

### Install the node modules

    npm install

## Running it

## Tests

    grunt

or just the tests:

    npm test

## Game

In root directory of cloned repo:

    ./game.sh

Or:

    node src/main.js

## External packages (npm)

### keypress-prompt

I wrote a prompter for node as it is a bit ugly how it all works to get input
on the console. This has been released as a separate node module (npm) with
the source here:

https://github.com/cymen/node-keypress-prompt

### Q

[Q](https://github.com/kriskowal/q/tree/v1) is a tool for making and composing asynchronous promises in JavaScript.

