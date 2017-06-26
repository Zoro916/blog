
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import style from './css/style.scss';

import Home from './components/home';
import Create_article from './components/create_article';

ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/create_article" component={Create_article} />
    </div>
  </Router>, 
  document.getElementById('root')
);