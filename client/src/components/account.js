
import Account_login from './account_login';
import Account_register from './account_register';

class Account extends React.Component {
    constructor(props) {
        super(props);
        this.handleAccount = this.handleAccount.bind(this);
    }

    handleAccount(ev, tab) {
        let target = ev.target.className;
        console.log(target);
        switch(tab) {
            case '':
                if (target === 'account' || target === 'box-close') {
                    this.props.handleClickLogin('');
                }
                break;
            case 'login':
                this.props.handleClickLogin('login');
                break;
            case 'register':
                this.props.handleClickLogin('register');
                break;
        }
    }

    render() {
        let display = this.props.display;
        let status = display !== '' ? 'block' : 'none';
        let isLogin = display === 'login' ? 'active' : '';
        let isRegister = display === 'register' ? 'active' : '';

        return (
            <div className='account' style={{'display': status}} onClick={(ev, tab) => {this.handleAccount(ev, '')}}>
                <div className='box'>
                    <div className='box-header'>
                        <div className={isLogin}  onClick={(ev, tab) => {this.handleAccount(ev, 'login')}}>登录</div>
                        <div className={isRegister}  onClick={(ev, tab) => {this.handleAccount(ev, 'register')}}>注册</div>
                        <div className='box-close' onClick={this.handleAccount}></div>
                    </div>
                    <div>
                        {this.props.display === 'login' ? <Account_login /> : <Account_register />}
                    </div>
                </div>
            </div>
        );
    }
}

export default Account;