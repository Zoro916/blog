
class Account_register extends React.Component {
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
        }).then(function(res) {
            console.log(res);
        })
    }

    render() {
        return (
            <form className='account-login'>
                <input type="text" name='username' placeholder='请输入用户名' />
                <input type="text" name='nickname' placeholder='请输入用户昵称' />
                <input type="password" name='password' placeholder='请输入密码' />
                <input type="password" name='repassword' placeholder='请再次输入密码' />
                <a onClick={this.handleRegister.bind(this)}>注册</a>
            </form>
        );
    }
}

export default Account_register;