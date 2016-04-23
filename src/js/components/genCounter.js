"use strict";

var React = require('react');

var GenCounter = React.createClass({
  propTypes: {
    genCount: React.PropTypes.number
  },

  render: function render() {
    return (
      <p className="text-right generations">Generations {this.props.genCount}</p>
    );
  }
});

module.exports = GenCounter;
