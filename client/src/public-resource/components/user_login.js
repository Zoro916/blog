
import { withRouter } from 'react-router-dom';

class User_login extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick(type) {
        let url = '/' + type;
        this.props.history.push(url);
    }

    render() {
        return (
            <div className='login-status'>
                {
                    this.props.username ? 
                    <span className='nickname'>{this.props.username}</span> : 
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