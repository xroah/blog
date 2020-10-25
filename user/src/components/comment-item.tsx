import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import Comment from "../containers/publish-comment";
import { Collapse } from "reap-ui/lib/Collapse";
import { format } from "fecha";

interface ItemProps {
    comment: any;
    articleId: string;
    replyTo: any;
}

interface UserProps {
    isAuthor: boolean;
    username: string;
    homepage: string;
}

const useStyles = createUseStyles({
    "comment-item": {
        borderBottom: "1px solid #eee",
        marginTop: 15,

        "& .publish-time": {
            fontSize: 12
        },

        "& .home-link": {
            display: "inline-block",
            maxWidth: 100
        },

        "& a": {
            textDecoration: "none"
        },

        "& .orig-comment": {
            padding: 10,
            marginBottom: 10,
            borderLeft: "3px solid #999",
            color: "#999",
            backgroundColor: "#f2f2f2"
        }
    }
});

function CommentUser(props: UserProps) {
    const {
        isAuthor,
        username,
        homepage
    } = props;
    const handleUrl = (url?: string) => {
        if (!url) return;

        if (url.startsWith("http") || url.startsWith("//")) {
            return url;
        }

        return `//${url}`;
    };
    const url = handleUrl(homepage);
    const cls = isAuthor ? " text-danger" : url ? " text-info" : "";

    return (
        <a
            href={handleUrl(homepage)}
            className={
                `align-middle text-truncate home-link${cls}`
            }
            target="_blank"
            dangerouslySetInnerHTML={{ __html: isAuthor ? "博主" : username }} />
    );
}

export default function CommentItem(props: ItemProps) {
    const {
        comment,
        articleId,
        replyTo
    } = props;
    const classes = useStyles();
    const [visible, updateVisible] = useState(false);
    const handleCancel = () => updateVisible(false);
    const handleReply = (evt: React.MouseEvent) => {
        updateVisible(true);
        evt.preventDefault();
    };
    const getUser = (comment: any) => (
        <CommentUser
            homepage={comment.homepage}
            isAuthor={comment.isAuthor}
            username={comment.username} />
    );
    let dateStr = "";

    try {
        dateStr = format(new Date(comment.createTime), "YYYY-MM-DD HH:mm");
    } catch (error) {
        console.log(error);
    }

    return (
        <>
            <div className={classes["comment-item"]}>
                <div>
                    {getUser(comment)}
                    <div className="text-muted publish-time">
                        {dateStr}
                    </div>
                </div>
                <div className="mt-2">
                    {
                        replyTo && (
                            <div className="orig-comment">
                                {getUser(replyTo)}:
                                <span
                                    className="ml-2"
                                    dangerouslySetInnerHTML={{ __html: `${replyTo.content}` }} />
                            </div>
                        )
                    }
                    <div dangerouslySetInnerHTML={{ __html: comment.content }} />
                </div>
                <div className="my-2">
                    <a href="#" onClick={handleReply}>回复</a>
                </div>
                <Collapse isOpen={visible}>
                    <Comment
                        articleId={articleId}
                        replyTo={comment._id}
                        root={comment.root || comment._id}
                        showCancel
                        onSuccess={handleCancel}
                        onCancel={handleCancel} />
                </Collapse>
            </div>
        </>
    );
}