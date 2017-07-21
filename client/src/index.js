
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, hashHistory } from 'react-router-dom';
import style from './public-resource/sass/style.scss';

import Home from './pages/home/home';
import Create_article from './pages/article/create';
import Login from './pages/user/login';
import Register from './pages/user/register';

ReactDOM.render(
  <Router history={hashHistory}>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/create" component={Create_article} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
    </div>
  </Router>,
  document.getElementById('root')
);
