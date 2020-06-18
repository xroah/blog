import React from "react";
import NoArticle from "./no-article";
import { RouteComponentProps } from "react-router-dom";
import { createUseStyles } from "react-jss";
import { format } from "fecha";
import ChevronLeft from "./icons/chevron-left";
import ChevronRight from "./icons/chevron-right";
import Spinner from "reap-ui/lib/Spinner";
import xhr from "../utils/xhr";
import { UPDATE_VIEWED_COUNTS } from "./api";
import Comment from "../containers/publish-comment";
import CommentList from "../containers/comment-list";

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

const useStyles = createUseStyles({
    "article-container": {
        lineHeight: 1.5
    },
    "chevrons": {
        position: "fixed",
        top: "36%",
        padding: 0,
        color: "#999",
        boxShadow: "none",
        cursor: "pointer",
        "&:focus": {
            boxShadow: "none"
        },

        "&.left": {
            left: -5
        },

        "&.right": {
            right: -5
        },

        "&:hover": {
            color: "#666"
        }
    }
});

interface ContainerProps {
    article: any;
    next: any;
    prev: any;
    toPrev: (evt: React.MouseEvent) => void;
    toNext: (evt: React.MouseEvent) => void;
}

function ArticleContainer(props: ContainerProps) {
    const classes = useStyles();
    const {
        article,
        next,
        prev,
        toPrev,
        toNext
    } = props;

    return (
        <>
            <div>
                <a href="#"
                    className={`${classes.chevrons} btn right${next ? "" : " disabled"}`}
                    title="下一篇"
                    onClick={toNext}>
                    <ChevronRight size={36} />
                </a>
                <a href="#"
                    className={`${classes.chevrons} btn left${prev ? "" : " disabled"}`}
                    title="上一篇"
                    onClick={toPrev}>
                    <ChevronLeft size={36} />
                </a>
            </div>
            <div className="ql-snow bg-white">
                <h3 className="text-center">{article.title}</h3>
                <h5 className="text-muted text-center">
                    <span className="mr-2">
                        发表于：{format(new Date(article.createTime), "YYYY-MM-DD hh:mm")}
                    </span>
                    <span className="mr-2">
                        归类于： {article.categoryName}
                    </span>
                    <span className="mr-2">今日浏览{article.todayViewed}次</span>
                    <span className="mr-2">总共浏览{article.totalViewed}次</span>
                </h5>
                <div
                    className={`ql-editor  ${classes["article-container"]}`}
                    dangerouslySetInnerHTML={{ __html: article.content }} />
            </div>
            <div className="mt-3 mb-5 bg-white p-4 border-rounded">
                <Comment articleId={article._id} />
                <CommentList articleId={article._id} />
            </div>
        </>
    )
};

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
