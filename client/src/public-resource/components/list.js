
import { withRouter, Link } from 'react-router-dom';
import _fetch from 'components/fetch';

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        };
    }

    componentDidMount() {
        let data = {
            title: '',
            cur_page: '0'
        };

        _fetch.post('/article/all_search', data, (res) => {
            if (!res.status) {
                return alert(res.err_info);
            }
            console.log(res);
            this.setState({
                list: res.article_list
            })
        });
    }

    render() {
        let listArr = this.state.list;
        console.log(listArr);
        let list = listArr.map((item, i) => {
            return (
                <div className='article' key={'article_'+i}>
                    <Link to={`/article/detail/${item.article_id}`} className='title ellipsis'>{item.title}</Link>
                    <p>作者：{item.author}</p>
                    <p>更新时间：{item.update_time}</p>
                </div>
            );
        });
        return (
            <div className='article-list'>
                {list}
            </div>
        );
    }
}

export default withRouter(List);