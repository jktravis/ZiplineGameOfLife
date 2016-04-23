"use strict";

var React = require('react');

var Cell = React.createClass({
  propTypes: {
    status: React.PropTypes.string,
    id: React.PropTypes.string,
    handleToggleCell: React.PropTypes.func
  },

  // todo: ensure the state is updated with the cell status.
  toggleCell: function (event) {
    $(event.target).toggleClass('alive').removeClass('old');
    this.props.handleToggleCell(event.target.id);
  },

  render: function render() {
    return (
      <div className={"cell " + this.props.status} id={this.props.id}
           onClick={this.toggleCell}></div>
    );
  }
});

module.exports = Cell;
