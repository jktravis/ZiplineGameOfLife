"use strict";

var React = require('react');

var Cell = React.createClass({
  propTypes: {
    status: React.PropTypes.string
  },

  // todo: ensure the state is updated with the cell status.
  highlightCell: function (event) {
    $(event.target).toggleClass('alive').removeClass('old');
  },

  render: function render() {
    return (
      <div className={"cell " + this.props.status} onClick={this.highlightCell}></div>
    );
  }
});

module.exports = Cell;
