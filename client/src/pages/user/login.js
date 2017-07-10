
import _fetch from 'components/fetch';
import { withRouter } from 'react-router-dom';

class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    handleLogin() {
        let form = document.querySelector('form');
        let username = form['username'].value;
        let password = form['password'].value;
        let data = {
            user_name: username,
            pass_word: md5(password)
        };
        
        _fetch.post('/user/signin', data, (res) => {
            if (!res.status) {
                return alert(res.err_info);
            } 

            sessionStorage.setItem('blog_user', JSON.stringify({username: username, auth_token: res.auth_token}));
            this.props.history.push('/');
        });
    }

    handleClickRegister() {
        this.props.history.push('/register');
    }

    render() {
        return (
            <div className='login-wrap'>
                <div className='logo'>随便编</div>
                <form className='form'>
                    <div className='tabs'>
                        <div className='tab-active'>登录</div>
                        <div onClick={() => {this.handleClickRegister()}}>注册</div>
                    </div>
                    <input type="text" name='username' placeholder='请输入账号' />
                    <input type="password" name='password' placeholder='请输入密码' />
                    <div>
                        <input type="checkbox" className='auto-login' />
                        <span>下次自动登录</span>
                        <a>忘记密码</a>
                    </div>
                    <a onClick={this.handleLogin.bind(this)}>登录</a>
                </form>
            </div>
        );
    }
}

export default withRouter(Login);