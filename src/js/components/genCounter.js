"use strict";

var React = require('react');

var GenCounter = React.createClass({
  propTypes: {
    genCount: React.PropTypes.number
  },

  render: function render() {
    return (
      <p className="text-right generations">Generations <span className="counter">{this.props.genCount}</span></p>
    );
  }
});

module.exports = GenCounter;
