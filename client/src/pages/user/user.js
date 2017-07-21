
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';
import Login from 'pages/user/login';
import Register from 'pages/user/register';

const User = ({ match }) => (
    <div>
        <Route exact path={`${match.url}/`} component={Login} />
        <Route path={`${match.url}/login`} component={Login} />
        <Route path={`${match.url}/register`} component={Register} />
    </div>
)

export default User;
