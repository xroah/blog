import React from "react";
import Card from "reap-ui/lib/Card";
import Button from "reap-ui/lib/Button";
import EyeIcon from "./icons/eye";
import MessageSquare from "./icons/message-square";
import { createUseStyles } from "react-jss";
import { format } from "fecha";
import Tag from "./icons/tag";

const useStyle = createUseStyles({
    "article-card": {
        transition: "all .3s",
        marginTop: 15,

        "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "1px 1px 5px 0 rgba(0, 0, 0, .3)"
        }
    },
    "article-tag": {
        borderRadius: 3,
        padding: 3,
        marginLeft: 5,
        fontSize: 12,
        backgroundColor: "#eee",
        color: "#666"
    },
    "article-title": {
        "& .card-title": {
            overflow: "hidden",
            textOverflow: "ellipsis",
            fontSize: 14,
            whiteSpace: "nowrap"
        },

        "& .card-subtitle": {
            fontSize: 12
        }
    }
});

interface ArticleCardProps {
    children: React.ReactNode;
    viewed: number;
    comments: number;
    articleId: string;
    title: string;
    time: string;
    tag: string[];
}

export default function ArticleCard(props: ArticleCardProps) {
    const classes = useStyle();
    const {
        viewed,
        comments,
        articleId,
        title,
        time,
        children,
        tag = []
    } = props;
    const viewArticle = () => window.open(`/view/${articleId}`);
    const tags = tag.filter(t => t)
        .map(
            t => !!t && <span key={t} className={classes["article-tag"]}>{t}</span>
        );

    return (
        <Card
            body
            className={classes["article-card"]}
            footer={
                <div className="d-flex align-items-center">
                    <EyeIcon />
                    <span className="ml-1">{viewed}</span>
                    <MessageSquare className="ml-3" />
                    <span className="ml-1">{comments}</span>
                    <Button
                        style={{ marginLeft: "auto" }}
                        onClick={viewArticle}>查看全文&gt;&gt;</Button>
                </div>
            }>
            <Card.Title
                className={classes["article-title"]}
                subtitle={format(new Date(time), "YYYY-MM-DD HH:mm")}>
                {title}
            </Card.Title>
            <Card.Text>{children}...</Card.Text>
            <div className="d-flex flex-wrap align-items-center">
                {
                    !!tags.length && (
                        <>
                            <Tag size={16} />
                            {tags}
                        </>
                    )
                }
            </div>
        </Card>
    )
}