"use strict";

var React = require('react');

var Cell = React.createClass({
  highlightCell: function (event) {
    $(event.target).toggleClass('alive');
  },

  render: function render() {
    return (
      <div className="cell" onClick={this.highlightCell}></div>
    );
  }
});

module.exports = Cell;
