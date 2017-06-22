
import Header from './header';
import Account from './Account';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: ''
        }
        this.handleClickLogin = this.handleClickLogin.bind(this);
    }

    handleClickLogin(item) {
        this.setState({
            active: item
        })
    }

    render() {
        let status = this.state.active;
        return (
            <div>   
                <Header handleClickLogin={this.handleClickLogin}/>
                <Account display={status} handleClickLogin={this.handleClickLogin} />
            </div>
        );
    }
}

export default Home;