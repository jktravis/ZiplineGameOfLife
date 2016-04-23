"use strict";

var React = require('react');

var ControlButtons = React.createClass({
  propTypes: {
    running: React.PropTypes.bool,
    handleStart: React.PropTypes.func,
    handleClear: React.PropTypes.func,
    handlePause: React.PropTypes.func
  },

  handleClick: function (event) {
    if (event.target !== this.clearButton) {
      $('button.active').removeClass('active');
      $(event.target).addClass('active');
    }
    if (event.target === this.startButton) {
      this.props.handleStart();
    } else if (event.target === this.pauseButton) {
      this.props.handlePause();
    } else if (event.target === this.clearButton) {
      this.props.handleClear();
    }
  },

  /* eslint-disable no-return-assign */
  render: function render() {
    return (
      <div className="btn-group btn-group-xs text-left" role="group" aria-label="start | pause | clear ">
        <button type="button" className="btn btn-default active"
                ref={(strt) => this.startButton = strt} onClick={this.handleClick}>Start
        </button>
        <button type="button" className="btn btn-default"
                ref={(pse) => this.pauseButton = pse} onClick={this.handleClick}>Pause
        </button>
        <button type="button" className="btn btn-default"
                ref={(cls) => this.clearButton = cls} onClick={this.handleClick}>Clear
        </button>
      </div>
    );
  }
});

module.exports = ControlButtons;
