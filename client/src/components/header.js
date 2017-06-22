
class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    handleLoginRegister(action) {
        this.props.handleClickLogin(action);
    }

    render() {
        return (
            <header className='header'>
                <div className='logo'>随便编</div>
                <div className='buttons'>
                    <a onClick={this.handleLoginRegister.bind(this, 'login')}>登录</a>
                    <a onClick={this.handleLoginRegister.bind(this, 'register')}>注册</a>
                    <a>写文章</a>
                </div>
                <div className='container'>
                    <a>首页</a>
                    <div className='search'>
                        <input type='text' placeholder='搜索' />
                        <div></div>
                    </div>
                </div>
            </header>
        );
    } 
}

export default Header;