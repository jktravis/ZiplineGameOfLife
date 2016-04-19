require('bootstrap/dist/css/bootstrap.min.css');
require('bootstrap/dist/css/bootstrap-theme.min.css');
require('bootstrap');
require('../css/main.scss');

import React from "react";
import ReactDOM from "react-dom";
import GameOfLife from "./components/gameOfLife";

ReactDOM.render(
  <GameOfLife />,
  document.getElementById('app')
);

