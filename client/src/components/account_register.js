
class Account_register extends React.Component {
    render() {
        return (
            <div className='account-login'>
                <input type="text" name='username' placeholder='请输入用户名' />
                <input type="text" name='password' placeholder='请输入密码' />
                <input type="text" name='repassword' placeholder='请再次输入密码' />
                <a>注册</a>
            </div>
        );
    }
}

export default Account_register;