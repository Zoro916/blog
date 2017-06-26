
import Header from './header';
import E from 'wangeditor';

class Create_article extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorContent: ''
        }
    }

    componentDidMount() {
        let elem = this.refs.editorElem;
        let editor = new E(elem);
        editor.customConfig.onchange = html => {
            this.setState({
                editorContent: html
            });
        }
        editor.create()
    }

    handleClick() {
        alert(this.state.editorContent);
    }

    render() {
        return (
            <div>
                <Header />
                <form>
                    <input type="text" placeholder='请输入文章标题' name='title' />
                    <div ref='editorElem' style={{textAlign: 'left'}}></div>
                    <button onClick={this.handleClick.bind(this)}>获取内容</button>
                </form>
            </div>
            
        );
    }
}

export default Create_article;




