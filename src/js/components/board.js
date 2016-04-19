"use strict";

var React = require('react');
var Cell = require('./cell');

//noinspection JSUnusedGlobalSymbols
var Board = React.createClass({
  getInitialState: () => {
    return {
      gridSize: {x: 3, y: 3},
      grid: [
        {
          id: 0,
          status: []
        },
        {
          id: 1,
          status: ['alive']
        },
        {
          id: 2,
          status: ['alive', 'old']
        },
        {
          id: 3,
          status: []
        },
        {
          id: 4,
          status: []
        },
        {
          id: 5,
          status: ['alive']
        },
        {
          id: 6,
          status: []
        },
        {
          id: 7,
          status: ['alive']
        },
        {
          id: 8,
          status: ['alive']
        }
      ]
    };
  },

  generateGrid: function () {
    let grid = [];
    for (let i = 0; i < this.state.gridSize.y; i++) {
      for (let j = 0; j < this.state.gridSize.x; j++) {
        // create keys like 00, 01, 12, etc.
        let key = 'y=' + i + 'x=' + j;
        let rnd = Math.floor((Math.random() * 3));
        let status = this.populateStatus(rnd);
        grid.push({id: key, status: status});
      }
    }
    return grid;
  },

  populateStatus: function (num) {
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
    var populateGrid = (cell) => {
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
