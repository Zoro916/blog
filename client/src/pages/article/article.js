
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';
import Header from 'components/header';
import List from 'components/list';
import Detail from 'pages/article/detail';
import Create from 'pages/article/create';

const Article = ({ match }) => (
    <div>
        <Header />
        <Route exact path={`${match.url}/`} component={List} />
        <Route path={`${match.url}/create`} component={Create} />
        <Route path={`${match.url}/detail/:articleId`} component={Detail} />
    </div>
)

export default withRouter(Article);