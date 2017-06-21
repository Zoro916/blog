
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import style from './css/style.scss';

import Home from './components/home';

ReactDOM.render(
  <Router>
    <div>
      <Route path="/" component={Home} />
    </div>
  </Router>, 
  document.getElementById('root')
);