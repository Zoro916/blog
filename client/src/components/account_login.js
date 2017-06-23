
class Account_login extends React.Component {

    handleLogin() {
        let form = document.querySelector('form');
        let username = form['username'].value;
        let password = form['password'].value;
        let data = new FormData();
        data.append('user_name', username);
        data.append('pass_word', password);
        
        fetch('http://112.74.40.94:3000/user/signin', {
            method: 'POST',
            body: data
        }).then(function(res) {
            console.log(res);
        })
    }

    render() {
        return (
            <form className='account-login'>
                <input type="text" name='username' placeholder='请输入账号' />
                <input type="password" name='password' placeholder='请输入密码' />
                <div>
                    <input type="checkbox" className='auto-login' />
                    <span>下次自动登录</span>
                    <a>忘记密码</a>
                </div>
                <a onClick={this.handleLogin.bind(this)}>登录</a>
            </form>
        );
    }
}

export default Account_login;