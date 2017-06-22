
class Account_login extends React.Component {
    render() {
        return (
            <div className='account-login'>
                <input type="text" name='username' placeholder='请输入账号' />
                <input type="text" name='password' placeholder='请输入密码' />
                <div>
                    <input type="checkbox" className='auto-login' />
                    <span>下次自动登录</span>
                    <a>忘记密码</a>
                </div>
                <a>登录</a>
            </div>
        );
    }
}

export default Account_login;