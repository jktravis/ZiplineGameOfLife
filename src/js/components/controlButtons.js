"use strict";

var React = require('react');

var ControlButtons = React.createClass({
  propTypes: {
    running: React.PropTypes.bool,
    controlFunc: React.PropTypes.func
  },

  handleClick: function (event) {
    var action;
    if (event.target === this.startButton) {
      if (!this.props.running) {
        action = {running: true};
      }
    } else if (event.target === this.pauseButton) {
      if (this.props.running) {
        action = {running: false};
      }
    } else if (event.target === this.clearButton) {
      action = {running: false};
    }
    if (action) {
      this.props.controlFunc(action);
    }
  },

  /* eslint-disable no-return-assign */
  render: function render() {
    return (
      <div className="btn-group btn-group-xs text-left" role="group" aria-label="start | pause | clear ">
        <button type="button" className="btn btn-success active"
                ref={(strt) => this.startButton = strt} onClick={this.handleClick}>Start
        </button>
        <button type="button" className="btn btn-warning"
                ref={(pse) => this.pauseButton = pse} onClick={this.handleClick}>Pause
        </button>
        <button type="button" className="btn btn-danger"
                ref={(cls) => this.clearButton = cls} onClick={this.handleClick}>Clear
        </button>
      </div>
    );
  }
});

module.exports = ControlButtons;
