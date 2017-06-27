
import Header from '../../public-resource/components/header';
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
        editor.create();
    }

    handleClick(e) {
        e.preventDefault();

        let title = document.querySelector('form')['title'].value;
        let content = this.state.editorContent;
        let auth_token = JSON.parse(sessionStorage.blog_user).auth_token;
        let data = new FormData();
        data.append('title', title);
        data.append('content', content);
        data.append('auth_token', auth_token);

        fetch('http://112.74.40.94:3000/article/create', {
            method: 'POST',
            body: data
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
        }).then((res) => {
            console.log(res);
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




