
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import style from './css/style.scss';

import Login from './components/login';
import Index from './components/index';

ReactDOM.render(
  <Router>
    <div>
      <Route path="/" component={Index} />
    </div>
  </Router>, 
  document.getElementById('root')
);