require('bootstrap/dist/css/bootstrap.min.css');
require('bootstrap/dist/css/bootstrap-theme.min.css');
require('bootstrap');
require('../css/main.scss');

var GameOfLife = require('./components/gameOfLife');

var React = require('react');
var ReactDOM = require('react-dom');

ReactDOM.render(
  <GameOfLife />,
  document.getElementById('app')
);

