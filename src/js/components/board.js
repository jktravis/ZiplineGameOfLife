"use strict";

var React = require('react');
var Cell = require('./cell')

var Board = React.createClass({
  render: function render() {
    var cells = [];
    var generateGrid = function (num) {
      for (let i = 0; i < num; i++) {
        cells.push(<Cell key={i} />);
      }
    };

    var populateGrid = function (cell) {
      return cell;
    };

    return (
      <div className="container-fluid">
        <div className="row">
          <h1 className="text-primary text-center">Game of Life</h1>
        </div>
        <div className="row col-lg-6 col-lg-offset-3">
          <div id="board">
            {generateGrid(1485)}
            {cells.map(populateGrid, this)}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Board;
