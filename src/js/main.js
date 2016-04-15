require('bootstrap/dist/css/bootstrap.min.css');
require('bootstrap/dist/css/bootstrap-theme.min.css');
require('bootstrap');
require('../css/main.scss');

var App = require('./components/app');

var React = require('react');
var ReactDOM = require('react-dom');

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

