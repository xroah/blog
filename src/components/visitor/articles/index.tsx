import * as React from "react";
import {
    RouteComponentProps,
    withRouter
} from "react-router-dom";
import ArticleCard from "@common/article-card";
import InlineLoading from "../loading";
import NoResult from "@common/no-article";
import "./index.scss";

interface Props extends RouteComponentProps {
    list?: Array<any>;
    started?: boolean;
    page?: number;
    hasMore?: boolean;
    fetchArticle?: (page: number) => any;
    updatePage?: (page: number) => any;
}

const win = window;
const LOAD_DISTANCE = 50;

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
        win.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        win.removeEventListener("scroll", this.handleScroll);
    }

    handleScroll = () => {
        let {
            page,
            hasMore,
            fetchArticle,
            updatePage,
            started
        } = this.props;
        if (!hasMore || started) return;
        let htmlEl = win.document.documentElement
        let scrollH = htmlEl.scrollHeight;
        let sTop = htmlEl.scrollTop || win.document.body.scrollTop;
        let winH = win.innerHeight;
        let dis = scrollH - winH - sTop;
        if (dis <= LOAD_DISTANCE) {
            page++;
            updatePage(page);
            fetchArticle(page);
        }
    };

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
        let {
            started,
            hasMore,
            list
        } = this.props;
        return (
            <div className="article-list">
                {this.renderArticle()}
                {
                    started ? <InlineLoading /> :
                        list.length ? null :
                            <NoResult message="没有文章" img="noResult" />
                }
                {
                    !hasMore && list.length > 0 &&
                    <div className="no-more">
                        <span>没有更多了</span>
                    </div>
                }
            </div>
        );
    }
}

export default withRouter(Articles);