
import Header from 'components/header';
import E from 'wangeditor';
import _fetch from 'components/fetch';

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
        editor.create();
    }

    handleClick(e) {
        e.preventDefault();

        let title = document.querySelector('form')['title'].value;
        let content = this.state.editorContent;
        let auth_token = JSON.parse(sessionStorage.blog_user).auth_token;
        let data = {
            title: title,
            auth_token: auth_token,
            article: content
        }

        _fetch.post('/article/create', data, (res) => {
            if (!res.status) {
                return alert(res.err_info);
            }

            alert('提交成功');
            this.props.history.push('/');
        });
    }

    render() {
        return (
            <div>
                <Header />
                <form className='create-article-wrap'>
                    <input type="text" placeholder='请输入文章标题' name='title' />
                    <div ref='editorElem' style={{textAlign: 'left'}}></div>
                    <button onClick={(e) => {this.handleClick(e)}}>发布文章</button>
                </form>
            </div>

        );
    }
}

export default Create_article;
