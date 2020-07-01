import React from "react";
import NoArticle from "./no-article";
import { RouteComponentProps } from "react-router-dom";
import Spinner from "reap-ui/lib/Spinner";
import xhr from "../utils/xhr";
import { UPDATE_VIEWED_COUNTS } from "./api";
import ArticleContainer from "./article-container";
import "quill/dist/quill.snow.css";
import "highlight.js/scss/atom-one-dark.scss";

const hljs = require("highlight.js/lib/core");

hljs.registerLanguage("css", require("highlight.js/lib/languages/css"));
hljs.registerLanguage("javascript", require("highlight.js/lib/languages/javascript"));

interface Props extends RouteComponentProps {
    article: any;
    prev?: any;
    next?: any;
    fetchArticle: (id: string) => any;
    fetchPrevNext: (id: string) => any;
    updateArticle: (article: any) => any;
}

export default class ViewArticle extends React.Component<Props> {
    componentDidMount() {
        const {
            article,
            fetchArticle,
            fetchPrevNext
        } = this.props;
        const id = this.getId();

        if (!id) {
            return;
        }

        if (!article) {
            fetchArticle(id);
        } else {
            this.highlight();
            this.updateCount();
        }

        fetchPrevNext(id);
    }

    componentDidUpdate(prevProps: Props) {
        const {
            article,
            updateArticle,
            fetchArticle,
            fetchPrevNext
        } = this.props;
        const id = this.getId();

        if (id && id !== (prevProps.match.params as any).id) {
            updateArticle(null);
            fetchArticle(id);
            fetchPrevNext(id);
        }

        if (article && article !== prevProps.article) {
            this.highlight();
            this.updateCount();
        }
    }

    async updateCount() {
        try {
            await xhr(UPDATE_VIEWED_COUNTS, {
                method: "post",
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                },
                data: {
                    articleId: this.props.article._id
                }
            });
        } catch (error) {
        }
    }

    highlight() {
        document.querySelectorAll(".ql-editor pre").forEach((block) => {
            hljs.highlightBlock(block);
        });
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

    to = (evt: React.MouseEvent, dir?: "next") => {
        const {
            history,
            prev,
            next
        } = this.props;
        let article: any = dir ? next : prev;

        evt.preventDefault();

        if (article) {
            history.push(`/view/${article._id}`);
        }
    }

    toPrev = (evt: React.MouseEvent) => {
        this.to(evt);
    }

    toNext = (evt: React.MouseEvent) => {
        this.to(evt, "next");
    }

    renderArticle() {
        const {
            article,
            next,
            prev
        } = this.props;

        if (!article || article === -1) return null;

        return (
            <>
                <ArticleContainer
                    prev={prev}
                    next={next}
                    toPrev={this.toPrev}
                    toNext={this.toNext}
                    article={article} />
            </>
        );
    }

    render() {
        const { article } = this.props;

        return (
            <>
                <div className="d-flex justify-content-center">
                    {!article && this.getId() && <Spinner variant="primary" animation="grow" />}
                </div>
                {
                    (article === -1 || !this.getId()) && (<NoArticle />)
                }
                {this.renderArticle()}
            </>
        );
    }
}
