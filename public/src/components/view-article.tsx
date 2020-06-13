import React from "react";
import NoArticle from "./no-article";
import { RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { WATCH_FETCH_ARTICLE_BY_ID, WATCH_FETCH_PREV_AND_NEXT } from "../actions";
import { createUseStyles } from "react-jss";
import { format } from "fecha";
import hljs from "highlight.js";

interface Props extends RouteComponentProps {
    article: any;
    prev: any;
    next: any;
    fetchArticle: (id: string) => any;
    fetchPrevNext: (id: string) => any;
}

const useStyles = createUseStyles({
    "article-container": {

    }
});

function ArticleContainer(props: { article: any }) {
    const classes = useStyles();
    const { article } = props;

    if (!article) {
        return null;
    }

    return (
        <div className="ql-snow">
            <h3 className="text-center">{article.title}</h3>
            <h5 className="text-muted text-center">
                <span className="mr-2">
                    {format(new Date(article.createTime), "YYYY-MM-DD hh:mm")}
                </span>
                <span className="mr-2">今日浏览{article.todayViewed}次</span>
                <span className="mr-2">总共浏览{article.totalViwed}次</span>
            </h5>
            <div
                className="ql-editor"
                dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>
    )
}

export default class ViewArticle extends React.Component<Props> {
    componentDidMount() {
        const {
            article,
            next,
            prev,
            fetchArticle,
            fetchPrevNext
        } = this.props;
        const id = this.getId();

        if (!id) {
            return;
        }

        if (!article) {
            fetchArticle(id);
            fetchPrevNext(id);
        }
    }

    componentDidUpdate(nextProps: Props) {
        const { article } = this.props;

        if (article !== nextProps.article) {
            document.querySelectorAll(".ql-editor pre").forEach((block) => {
                hljs.highlightBlock(block);
            });
        }
    }

    getId() {
        const {
            match: {
                params: { id }
            }
        } = this.props as any;

        if (!id || id.length < 24) {
            return null;
        }

        return id;
    }

    render() {
        const {
            article
        } = this.props;

        return (
            <div>
                {
                    (article === -1 || !this.getId()) && (<NoArticle />)
                }
                {
                    (article && article !== -1) && (
                        <ArticleContainer article={article} />
                    )
                }
            </div>
        );
    }
}

export const ConnectedView = connect(
    (state: any) => ({
        article: state.view.article,
        next: state.view.next,
        prev: state.view.next
    }),
    dispatch => ({
        fetchArticle(id: string) {
            dispatch({
                type: WATCH_FETCH_ARTICLE_BY_ID,
                articleId: id
            })
        },
        fetchPrevNext(id: string) {
            dispatch({
                type: WATCH_FETCH_PREV_AND_NEXT,
                articleId: id
            });
        }
    })
)(ViewArticle);