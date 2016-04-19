"use strict";

var React = require('react');
var Cell = require('./cell');
var _ = require('lodash');

//noinspection JSUnusedGlobalSymbols
var Board = React.createClass({
  getInitialState: () => {
    return {
      gridSize: {x: 9, y: 9},
      grid: []
    };
  },

  generateGrid: function () {
    let grid = [];
    for (let i = 0; i < this.state.gridSize.y; i++) {
      for (let j = 0; j < this.state.gridSize.x; j++) {
        // create keys like 00, 01, 12, etc.
        let key = 'y=' + i + 'x=' + j;
        let status;
        status = this.generateInitialStatus();
        grid.push({id: key, status: status, x: j, y: i});
      }
    }
    this.setState({initialize: false});
    return grid;
  },

  calculateStatus: function () {
    let grid = this.state.grid;
    for (let i = 0; i < grid.length; i++) {
      let neighbors = this.getCellNeighbors(grid[i]);
      let aliveNeighbors = 0;
      let alive = _.includes(grid[i].status, 'alive');
      let old = _.includes(grid[i].status, 'old');
      for (let j = 0; j < neighbors.length; j++) {
        if (neighbors[j] && _.includes(neighbors[j].status, 'alive')) {
          aliveNeighbors = aliveNeighbors + 1;
        }
      }

      if (alive) {
        if (aliveNeighbors < 2) {
          grid[i].status = [];
        } else if (aliveNeighbors === 2 || aliveNeighbors === 3 && !old) {
          grid[i].status.push('old');
        } else if (aliveNeighbors > 3) {
          grid[i].status = [];
        }
      } else if (aliveNeighbors === 3) {
        grid[i].status.push('alive');
      }
    }
    this.setState({grid: grid});
  },

  getCellNeighbors: function (cell) {
    let topLeft, top, topRight,
      left, right,
      bottomLeft, bottom, bottomRight;

    topLeft = this.state.grid.filter(function (o) {
      return o.id === 'y=' + (cell.y - 1) + 'x=' + (cell.x - 1);
    })[0];

    top = this.state.grid.filter(function (o) {
      return o.id === 'y=' + (cell.y - 1) + 'x=' + (cell.x);
    })[0];

    topRight = this.state.grid.filter(function (o) {
      return o.id === 'y=' + (cell.y - 1) + 'x=' + (cell.x + 1);
    })[0];

    left = this.state.grid.filter(function (o) {
      return o.id === 'y=' + (cell.y) + 'x=' + (cell.x - 1);
    })[0];

    right = this.state.grid.filter(function (o) {
      return o.id === 'y=' + (cell.y) + 'x=' + (cell.x + 1);
    })[0];

    bottomLeft = this.state.grid.filter(function (o) {
      return o.id === 'y=' + (cell.y + 1) + 'x=' + (cell.x - 1);
    })[0];

    bottom = this.state.grid.filter(function (o) {
      return o.id === 'y=' + (cell.y + 1) + 'x=' + (cell.x);
    })[0];

    bottomRight = this.state.grid.filter(function (o) {
      return o.id === 'y=' + (cell.y + 1) + 'x=' + (cell.x + 1);
    })[0];

    return [
      topLeft,
      top,
      topRight,
      left,
      right,
      bottomLeft,
      bottom,
      bottomRight
    ];
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

  componentDidMount: function () {
    this._timer = setInterval(
      () => this.calculateStatus(),
      500
    );
  },

  componentWillUnmount: function () {
    clearInterval(this._timer);
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
