import * as React from "react";
import {
    RouteComponentProps,
    withRouter
} from "react-router-dom";
import ArticleCard from "@common/article-card";

interface Props extends RouteComponentProps {
    list?: Array<any>;
    started?: boolean;
    page?: number;
    fetchArticle?: (page: number) => any;
    updatePage?: (page: number) => any;
}

class Articles extends React.Component<Props> {

    componentDidMount() {
        let {
            list,
            page,
            fetchArticle
        } = this.props;
        if (!list.length) {
            fetchArticle(page);
        }
    }

    renderArticle() {
        let { list = [] } = this.props;
        return list.map(
            a => (
                <ArticleCard
                    viewPath="/article"
                    key={a._id}
                    id={a._id}
                    article={a} />
            )
        );
    }

    render() {
        return (
            <div className="scroll-wrapper">
                {this.renderArticle()}
            </div>
        );
    }
}

export default withRouter(Articles);