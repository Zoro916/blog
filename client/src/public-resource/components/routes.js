
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Home from 'pages/home/home';
import User from 'pages/user/user';
import Article from 'pages/article/article';
import Modal from 'components/modal';

const Routes = () => (
    <Router>
        <div>
            <Route exact path='/' component={Home} />
            <Route path='/user' component={User} />
            <Route path='/article' component={Article} />
            <Modal />
        </div>
    </Router>
)

export default Routes;