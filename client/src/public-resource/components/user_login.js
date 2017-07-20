
import { withRouter, Link } from 'react-router-dom';

class User_login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ''
        }
    }

    handleLogout() {
        sessionStorage.clear();
        this.props.handleLogout();
    }

    render() {
        return (
            <div className='login-status'>
                {
                    this.props.username ? 
                    <span className='nickname'>
                        <span>{this.props.username}</span>
                        <span onClick={() => {this.handleLogout()}}>退出</span>
                    </span> : 
                    <div>
                        <Link to='/user/login' className='login'>登录</Link>
                        <Link to='/user/register' className='register'>注册</Link>
                    </div>
                }
            </div>
        );
    }
}

export default withRouter(User_login);