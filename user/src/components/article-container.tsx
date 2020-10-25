import React from "react";
import { createUseStyles } from "react-jss";
import { format } from "fecha";
import ChevronLeft from "./icons/chevron-left";
import ChevronRight from "./icons/chevron-right";
import Comment from "../containers/publish-comment";
import CommentList from "../containers/comment-list";
import Helmet from "react-helmet"

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

export default function ArticleContainer(props: ContainerProps) {
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
            <Helmet>
                <title>{article.title}</title>
            </Helmet>
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
            <div className="ql-snow bg-white py-2 rounded">
                <h1 className="text-center">{article.title}</h1>
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
            <div className="mt-3 mb-3 bg-white p-4 rounded">
                <Comment articleId={article._id} />
                <CommentList articleId={article._id} />
            </div>
        </>
    )
};