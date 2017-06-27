
import 'whatwg-fetch';
import { withRouter } from 'react-router-dom';

class Register extends React.Component {
    constructor(props) {
        super(props);
    }

    handleRegister() {
        let form = document.querySelector('form');
        let username = form['username'].value;
        let nickname = form['nickname'].value;
        let password = form['password'].value;
        let data = new FormData();
        data.append('user_name', username);
        data.append('nick_name', nickname);
        data.append('pass_word', password);
        
        fetch('http://112.74.40.94:3000/user/signup', {
            method: 'POST',
            body: data
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
        }).then((res) => {
            sessionStorage.setItem('blog_user', JSON.stringify({username: username, auth_token: res.auth_token}));
            alert('注册成功');
            this.props.history.push('/');
        });
    }

    handleClickLogin() {
        this.props.history.push('/login');
    }

    render() {
        return (
            <div className='login-wrap'>
                <div className='logo'>随便编</div>
                <form className='form'>
                    <div className='tabs'>
                        <div onClick={() => {this.handleClickLogin()}}>登录</div>
                        <div className='tab-active'>注册</div>
                    </div>
                    <input type="text" name='username' placeholder='请输入用户名' />
                    <input type="text" name='nickname' placeholder='请输入用户昵称' />
                    <input type="password" name='password' placeholder='请输入密码' />
                    <input type="password" name='repassword' placeholder='请再次输入密码' />
                    <a onClick={this.handleRegister.bind(this)}>注册</a>
                </form>
            </div>
        );
    }
}

export default withRouter(Register);