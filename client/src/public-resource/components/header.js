
import User_login from './user_login';
import { withRouter } from 'react-router-dom';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: '',
            username: ''
        }
    }

    componentDidMount() {
        if (sessionStorage.blog_user) {
            let username = JSON.parse(sessionStorage.blog_user).username;
            this.setState({
                username: username
            });
        }
    }
 
    handleLoginRegister(tab) {
        this.setState({
            active: tab
        });
    }

    handleCreateArticle() {
        if (!sessionStorage.blog_user) {
            alert('请先登录');
            this.props.history.push('/login');
        } else {
            this.props.history.push('/create');
        }
    }
 
    render() {
        let status = this.state.active;
        return (
            <div className='header-wrap'>
                <header className='header'>
                    <div className='logo'>随便编</div>
                    <div className='buttons'>
                        <User_login username={this.state.username} />
                        <button className='create-article' onClick={() => {this.handleCreateArticle()}}>写文章</button>
                    </div>
                    <div className='container'>
                        <a>首页</a>
                        <div className='search'>
                            <input type='text' placeholder='搜索' />
                            <div></div>
                        </div>
                    </div>
                </header>
            </div>
        );
    } 
}

export default withRouter(Header);