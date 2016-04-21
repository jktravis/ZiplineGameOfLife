"use strict";

var React = require('react');
var Cell = require('./cell');
var _ = require('lodash');

//noinspection JSUnusedGlobalSymbols
var Board = React.createClass({
  getInitialState: () => {
    return {
      gridSize: {x: 45, y: 30},
      grid: []
    };
  },

  generateGrid: function () {
    let grid = [];
    for (let i = 0; i < this.state.gridSize.y; i++) {
      for (let j = 0; j < this.state.gridSize.x; j++) {
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
    let currentGrid = this.state.grid;
    let newGrid = this.cloneGrid(currentGrid);
    for (let i = 0; i < currentGrid.length; i++) {
      let neighbors = this.getCellNeighbors(currentGrid[i]);
      let aliveNeighbors = 0;
      let alive = _.includes(currentGrid[i].status, 'alive');
      let old = _.includes(currentGrid[i].status, 'old');
      for (let j = 0; j < neighbors.length; j++) {
        if (neighbors[j] && _.includes(neighbors[j].status, 'alive')) {
          aliveNeighbors = aliveNeighbors + 1;
        }
      }

      if (alive) {
        if (aliveNeighbors < 2) {
          newGrid[i].status = [];
        } else if ((aliveNeighbors >= 2 && aliveNeighbors <= 3) && !old) {
          newGrid[i].status.push('old');
        } else if (aliveNeighbors > 3) {
          newGrid[i].status = [];
        }
      } else {
        if (aliveNeighbors === 3) {
          newGrid[i].status.push('alive');
        }
      }
    }
    this.setState({grid: newGrid});
  },

  cloneGrid: function (grid) {
    var newGrid = [];
    for (let i = 0; i < grid.length; i++) {
      newGrid.push(_.cloneDeep(grid[i]));
    }
    return newGrid;
  },

  getCellNeighbors: function (cell) {
    return this.state.grid.filter((o) => {
      let x = cell.x;
      let y = cell.y;
      let gx = this.state.gridSize.x;
      let gy = this.state.gridSize.y;
      let neighbor;

      // Left Edge
      if (x === 0) {
        if (o.id === 'y=' + (y - 1) + 'x=' + (gx - 1) ||
          o.id === 'y=' + (y) + 'x=' + (gx - 1) ||
          o.id === 'y=' + (y + 1) + 'x=' + (gx - 1)) {
          neighbor = o;
        }
      }

      // Top Edge
      if (y === 0) {
        if (o.id === 'y=' + (gy - 1) + 'x=' + (x - 1) ||
          o.id === 'y=' + (gy - 1) + 'x=' + (x) ||
          o.id === 'y=' + (gy - 1) + 'x=' + (x + 1)) {
          neighbor = o;
        }
      }

      // Right Edge
      if (x === gx - 1) {
        if (o.id === 'y=' + (y - 1) + 'x=' + (0) ||
          o.id === 'y=' + (y) + 'x=' + (0) ||
          o.id === 'y=' + (y + 1) + 'x=' + (0)) {
          neighbor = o;
        }
      }

      // Bottom Edge
      if (y === gy - 1) {
        if (o.id === 'y=' + (0) + 'x=' + (x - 1) ||
          o.id === 'y=' + (0) + 'x=' + (x) ||
          o.id === 'y=' + (0) + 'x=' + (x + 1)) {
          neighbor = o;
        }
      }

      // Top Left Corner
      if (x === 0 && y === 0) {
        if (o.id === 'y=' + (gy - 1) + 'x=' + (gx - 1)) {
          neighbor = o;
        }
      }

      // Top Right Corner
      if (x === gx - 1 && y === 0) {
        if (o.id === 'y=' + (gy - 1) + 'x=' + (0)) {
          neighbor = o;
        }
      }

      // Bottom Right Corner
      if (x === gx - 1 && y === gy - 1) {
        if (o.id === 'y=' + (0) + 'x=' + (0)) {
          neighbor = o;
        }
      }

      // Bottom Left Corner
      if (x === 0 && y === gy - 1) {
        if (o.id === 'y=' + (0) + 'x=' + (gx - 1)) {
          neighbor = o;
        }
      }

      // Everything in between
      if (o.id === 'y=' + (y - 1) + 'x=' + (x - 1) ||
        o.id === 'y=' + (y - 1) + 'x=' + (x) ||
        o.id === 'y=' + (y - 1) + 'x=' + (x + 1) ||
        o.id === 'y=' + (y) + 'x=' + (x - 1) ||
        o.id === 'y=' + (y) + 'x=' + (x + 1) ||
        o.id === 'y=' + (y + 1) + 'x=' + (x - 1) ||
        o.id === 'y=' + (y + 1) + 'x=' + (x) ||
        o.id === 'y=' + (y + 1) + 'x=' + (x + 1)) {
        neighbor = o;
      }
      return neighbor;
    });
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
