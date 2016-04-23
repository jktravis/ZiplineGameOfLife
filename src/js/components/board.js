"use strict";

var React = require('react');
var Cell = require('./cell');
var GenCounter = require('./genCounter');
var _ = require('lodash');

//noinspection JSUnusedGlobalSymbols
var Board = React.createClass({
  getInitialState: () => {
    return {
      gridSize: {x: 45, y: 30},
      generations: 0,
      running: true
    };
  },

  generateGrid: function () {
    let state = this.state;
    let y = state.gridSize.y;
    let x = state.gridSize.x;

    for (let i = 0; i < y; i++) {
      for (let j = 0; j < x; j++) {
        let key = 'y=' + i + 'x=' + j;
        let status = this.generateInitialStatus();
        state[key] = {id: key, status: status, x: j, y: i};
      }
    }

    for (let i = 0; i < y; i++) {
      for (let j = 0; j < x; j++) {
        let cell = state['y=' + i + 'x=' + j];
        cell.neighbors = this.getCellNeighbors(cell);
      }
    }

    state.generations = state.generations + 1;
    this.setState(state);
  },

  calculateStatus: function () {
    this.time = new Date().getTime();

    const currentState = this.state;
    const newState = this.cloneState(currentState);
    for (let row = 0; row < currentState.gridSize.y; row++) {
      for (let col = 0; col < currentState.gridSize.x; col++) {
        let cell = currentState['y=' + row + 'x=' + col];
        let aliveNeighbors = this.getAliveNeighborCount(cell.neighbors);
        let alive = _.includes(cell.status, 'alive');
        let old = _.includes(cell.status, 'old');

        if (alive && aliveNeighbors < 2) {
          newState[cell.id].status = [];
        } else if (alive && (aliveNeighbors >= 2 && aliveNeighbors <= 3) && !old) {
          newState[cell.id].status.push('old');
        } else if (alive && aliveNeighbors > 3) {
          newState[cell.id].status = [];
        } else if (!alive && aliveNeighbors === 3) {
          newState[cell.id].status.push('alive');
        }
      }
    }

    newState.generations = currentState.generations + 1;
    this.setState(newState);
    let now = new Date().getTime();
    let delta = now - this.time;

    while (delta < 100) {
      now = new Date().getTime();
      delta = now - this.time;
    }
    this.intervalID = requestAnimationFrame(this.calculateStatus);
  },

  getAliveNeighborCount: function (neighbors) {
    let aliveNeighbors = 0;
    for (let n = 0; n < neighbors.length; n++) {
      let neighbor = this.state[neighbors[n]];
      if (neighbor && _.includes(neighbor.status, 'alive')) {
        aliveNeighbors = aliveNeighbors + 1;
      }
    }
    return aliveNeighbors;
  },

  cloneState: function (state) {
    return _.cloneDeep(state);
  },

  getCellNeighbors: function (cell) {
    const state = this.state;
    const x = cell.x;
    const y = cell.y;
    const gx = state.gridSize.x;
    const gy = state.gridSize.y;
    let neighbors = [];

    // Left Edge
    if (x === 0) {
      neighbors.push('y=' + (y - 1) + 'x=' + (gx - 1));
      neighbors.push('y=' + (y) + 'x=' + (gx - 1));
      neighbors.push('y=' + (y + 1) + 'x=' + (gx - 1));
    }

    // Top Left Corner
    if (x === 0 && y === 0) {
      neighbors.push('y=' + (gy - 1) + 'x=' + (gx - 1));
    }

    // Top Edge
    if (y === 0) {
      neighbors.push('y=' + (gy - 1) + 'x=' + (x - 1));
      neighbors.push('y=' + (gy - 1) + 'x=' + (x));
      neighbors.push('y=' + (gy - 1) + 'x=' + (x + 1));
    }

    // Right Edge
    if (x === gx - 1) {
      neighbors.push('y=' + (y - 1) + 'x=' + (0));
      neighbors.push('y=' + (y) + 'x=' + (0));
      neighbors.push('y=' + (y + 1) + 'x=' + (0));
    }

    // Bottom Edge
    if (y === gy - 1) {
      neighbors.push('y=' + (0) + 'x=' + (x - 1));
      neighbors.push('y=' + (0) + 'x=' + (x));
      neighbors.push('y=' + (0) + 'x=' + (x + 1));
    }

    // Top Right Corner
    if (x === gx - 1 && y === 0) {
      neighbors.push('y=' + (gy - 1) + 'x=' + (0));
    }

    // Bottom Right Corner
    if (x === gx - 1 && y === gy - 1) {
      neighbors.push('y=' + (0) + 'x=' + (0));
    }

    // Bottom Left Corner
    if (x === 0 && y === gy - 1) {
      neighbors.push('y=' + (0) + 'x=' + (gx - 1));
    }

    // Everything in between
    neighbors.push('y=' + (y - 1) + 'x=' + (x - 1));
    neighbors.push('y=' + (y - 1) + 'x=' + (x));
    neighbors.push('y=' + (y - 1) + 'x=' + (x + 1));
    neighbors.push('y=' + (y) + 'x=' + (x - 1));
    neighbors.push('y=' + (y) + 'x=' + (x + 1));
    neighbors.push('y=' + (y + 1) + 'x=' + (x - 1));
    neighbors.push('y=' + (y + 1) + 'x=' + (x));
    neighbors.push('y=' + (y + 1) + 'x=' + (x + 1));
    return neighbors;
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
    this.generateGrid();
  },

  componentDidMount: function () {
    this.intervalID = requestAnimationFrame(this.calculateStatus);
  },

  componentWillUnmount: function () {
    cancelAnimationFrame(this.intervalID);
  },

  render: function render() {
    let cells = [];
    for (let i = 0; i < this.state.gridSize.y; i++) {
      for (let j = 0; j < this.state.gridSize.x; j++) {
        let cell = this.state['y=' + i + 'x=' + j];
        cells.push(<Cell key={cell.id} id={cell.id} status={cell.status.join(' ')}/>);
      }
    }

    return (
      <div className="container-fluid">
        <div className="row">
          <h1 className="text-primary text-center">Game of Life</h1>
        </div>
        <div className="row col-lg-6 col-lg-offset-3 col-md-offset-2 col-sm-offset-1">
          <GenCounter genCount={this.state.generations}/>
          <div id="board">
            {cells}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Board;
