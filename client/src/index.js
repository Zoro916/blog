
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, hashHistory } from 'react-router-dom';
import style from './public-resource/sass/style.scss';

import Routes from 'components/routes';

ReactDOM.render(
  <Routes />,
  document.getElementById('root')
);
