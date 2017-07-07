
import { withRouter } from 'react-router-dom';

class User_login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ''
        }
    }

    handleClick(type) {
        let url = '/' + type;
        this.props.history.push(url);
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
                        <button className='login' onClick={(type) => {this.handleClick('login')}}>登录</button>
                        <button className='register' onClick={(type) => {this.handleClick('register')}}>注册</button>
                    </div>
                }
            </div>
        );
    }
}

export default withRouter(User_login);