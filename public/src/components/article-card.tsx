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
        
        "& + .card": {
            marginTop: 20
        },

        "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "1px 1px 5px 0 rgba(0, 0, 0, .3)"
        },

        "& .card-footer": {
            border: "none"
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
            whiteSpace: "nowrap",
            marginBottom: 5
        },

        "& .card-subtitle": {
            fontSize: 12
        }
    },
    "footer-icon": {
        color: "#666"
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
    const formatStr = "YYYY-MM-DD HH:mm";
    let timeStr = "";

    try {
        //if time is undefined, date will be invalid
        //and format will throw an error
        timeStr = format(new Date(time), formatStr);
    } catch (error) {
    }

    return (
        <Card
            body
            className={classes["article-card"]}
            footer={
                <div className="d-flex align-items-center">
                    <div className={classes["footer-icon"]}>
                        <EyeIcon />
                        <span className="ml-1">{viewed}</span>
                        <MessageSquare className="ml-3" />
                        <span className="ml-1">{comments}</span>
                    </div>
                    <Button
                        style={{ marginLeft: "auto" }}
                        onClick={viewArticle}>查看全文&gt;&gt;</Button>
                </div>
            }>
            <Card.Title
                className={classes["article-title"]}
                subtitle={timeStr}>
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