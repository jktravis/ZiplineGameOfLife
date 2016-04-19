"use strict";

var React = require('react');
var Cell = require('./cell');

//noinspection JSUnusedGlobalSymbols
var Board = React.createClass({
  getInitialState: () => {
    return {
      gridSize: {x: 9, y: 9},
      grid: [],
      initialize: true
    };
  },

  generateGrid: function () {
    let grid = [];
    for (let i = 0; i < this.state.gridSize.y; i++) {
      for (let j = 0; j < this.state.gridSize.x; j++) {
        // create keys like 00, 01, 12, etc.
        let key = 'y=' + i + 'x=' + j;
        let status;
        if (this.state.initialize) {
          status = this.generateInitialStatus();
        }
        grid.push({id: key, status: status, x: j, y: i});
      }
    }
    this.setState({initialize: false});
    return grid;
  },

  generateInitialStatus: function () {
    let num = Math.floor((Math.random() * 3));
    switch (num) {
      case 0:
        return [];
      case 1:
        return ['alive'];
      case 2:
        return ['alive', 'old'];
      default:
        return [];
    }
  },

  componentWillMount: function () {
    this.setState({grid: this.generateGrid()});
  },

  render: function render() {
    const populateGrid = (cell) => {
      return (<Cell key={cell.id} id={cell.id} status={cell.status.join(' ')}/>);
    };

    return (
      <div className="container-fluid">
        <div className="row">
          <h1 className="text-primary text-center">Game of Life</h1>
        </div>
        <div className="row col-lg-6 col-lg-offset-3 col-md-offset-2 col-sm-offset-1">
          <div id="board">
            {this.state.grid.map(populateGrid, this)}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Board;
