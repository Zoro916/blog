
import Header from 'components/header';
import _fetch from 'components/fetch';

class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            author: '',
            create_time: '',
            update_time: '',
            classify: ''
        }
    }

    componentDidMount() {
        let data = {
            article_id: this.props.match.params.articleId
        };

        _fetch.post('/article/detail', data, (res) => {
            if (!res.status) {
                return alert(res.err_info);
            }

            this.setState({
                title: res.data.title,
                author: res.data.author,
                create_time: res.data.create_time,
                update_time: res.data.update_time,
                classify: res.data.classify
            });

            this.refs.article.innerHTML = res.data.article;
        });
    }

    render() {
        return (
            <div className='article-detail'>
                <h1>{this.state.title}</h1>
                <div className='info'>
                    <span>作者：{this.state.author}</span>
                    <span>更新时间：{this.state.update_time}</span>
                </div>
                <div className='content' ref='article'></div>
            </div>
        );
    }
}

export default Detail;