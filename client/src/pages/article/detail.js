
import Header from 'components/header';

class Detail extends React.Component {
    render() {
        let articleId = this.props.match.params.articleId;
        return (
            <div>
                <Header />
                {articleId}
            </div>
        );
    }
}

export default Detail;