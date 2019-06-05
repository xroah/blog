import * as React from "react";
import {
    RouteComponentProps,
    withRouter
} from "react-router-dom";
import ArticleCard from "@common/article-card";
import InlineLoading from "@common/inline-loading";
import NoResult from "@common/no-article";
import "./index.scss";

interface Props extends RouteComponentProps {
    list?: Array<any>;
    started?: boolean;
    page?: number;
    hasMore?: boolean;
    fetchArticle?: (page: number, callback?: Function) => any;
    updatePage?: (page: number) => any;
    emptyArticle?: () => any;
}

const win = window;
const LOAD_DISTANCE = 100;
const MAX_DIS = 50;

class Articles extends React.Component<Props> {

    timer: NodeJS.Timeout;
    startY: number = 0;

    state = {
        dis: 0,
        showMsg: false
    };

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
        let scrollLoad = () => {
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
        }
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(scrollLoad, 50);
    };

    renderArticle() {
        let { list = [] } = this.props;
        return list.map(
            a => (
                <ArticleCard
                    viewPath="/articles"
                    key={a._id}
                    id={a._id}
                    article={a} />
            )
        );
    }

    handleTouchStart = (evt: React.TouchEvent) => {
        this.startY = evt.touches[0].pageY;
    }

    handleTouchMove = (evt: React.TouchEvent) => {
        let sTop = document.body.scrollTop || document.documentElement.scrollTop;
        let offset = evt.touches[0].pageY;
        if (sTop === 0 && offset > this.startY) {
            let dis = offset - this.startY;
            this.setState({
                showMsg: true,
                dis
            });
        } 
    }

    handleTouchEnd = (evt: React.TouchEvent) => {
        if (evt.touches.length) return;
        if (this.state.dis >= MAX_DIS) {
            let {
                fetchArticle,
                emptyArticle,
                updatePage
            } = this.props;
            emptyArticle();
            updatePage(1);
            fetchArticle(1);
        }
        this.setState({
            dis: this.startY = 0,
            showMsg: false
        });
    }

    render() {
        let {
            started,
            hasMore,
            list
        } = this.props;
        let {
            dis,
            showMsg
        } = this.state;
        const top = 20;
        return (
            <>
                {
                    showMsg && (
                        <div
                            className="dropdown-msg"
                            style={{ top: top + dis }}>
                            {
                                dis >= MAX_DIS ? "释放刷新" : "下拉刷新"
                            }
                        </div>
                    )
                }
                <div
                    className="article-list"
                    onTouchStart={this.handleTouchStart}
                    onTouchMove={this.handleTouchMove}
                    onTouchEnd={this.handleTouchEnd}
                    style={{ transform: `translateY(${dis}px)` }}>
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
            </>
        );
    }
}

export default withRouter(Articles);