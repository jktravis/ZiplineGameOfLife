"use strict";
var React = require('react');
var Board = require('./board');

var GameOfLife = React.createClass({
  render: function render() {
    return (
      <Board />
    );
  }
});

module.exports = GameOfLife;
