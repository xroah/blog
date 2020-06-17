import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import Comment from "../containers/publish-comment";
import Spinner from "reap-ui/lib/Spinner";
import { Collapse } from "reap-ui/lib/Collapse";
import { format } from "fecha";

interface Props {
    list: any[];
    error: boolean;
    loading: boolean;
    fetchComments: (articleId: string) => void;
    articleId: string;
}

const useStyles = createUseStyles({
    "comment-wrapper": {
        borderTop: "1px solid #eee",
        margin: "20px 0"
    },
    "sub-comment-wrapper": {
        paddingLeft: 20
    }
});

interface ItemProps {
    comment: any;
    articleId: string;
    isChild?: boolean;
    replyTo: any;
}

const useItemStyles = createUseStyles({
    "comment-item": {
        marginBottom: 15,
        borderBottom: "1px solid #eee",

        "& .publish-time": {
            fontSize: 12
        },

        "& .home-link": {
            display: "inline-block",
            maxWidth: 100
        },

        "& a": {
            textDecoration: "none"
        }
    }
});

function CommentItem(props: ItemProps) {
    const {
        comment,
        articleId,
        isChild = false,
        replyTo
    } = props;
    const classes = useItemStyles();
    const [visible, updateVisible] = useState(false);
    const handleCancel = () => updateVisible(false);
    const handleReply = (evt: React.MouseEvent) => {
        updateVisible(true);
        evt.preventDefault();
    };
    const handleUrl = (url?: string) => {
        if (!url) return;

        if (url.startsWith("http") || url.startsWith("//")) {
            return url;
        }

        return `//${url}`;
    }
    const renderUser = () => {
        let el = null;
        const DEFAULT_NAME = "匿名用户";

        if (isChild) {
            el = (
                <>
                    <a
                        href={handleUrl(comment.homePage)}
                        target="blank"
                        className="mr-2 home-link text-truncate align-middle">
                        {comment.username || DEFAULT_NAME}
                    </a>
                    <span className="mr-2 text-secondary align-middle">回复</span>
                    <a
                        href={handleUrl(replyTo.homePage)}
                        className="home-link text-truncate align-middle"
                        target="blank">
                        {replyTo.username || DEFAULT_NAME}
                    </a>
                </>
            );
        } else {
            el = (
                <a
                    href={handleUrl(comment.homePage)}
                    className="home-link text-truncate align-middle"
                    target="blank">
                    {comment.username || DEFAULT_NAME}
                </a>
            );
        }

        return <div>{el}</div>;
    };
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
                    {renderUser()}
                    <div className="text-muted publish-time">
                        {dateStr}
                    </div>
                </div>
                <p className="mt-2">{comment.content}</p>
                <p className="mt-2">
                    <a href="#" onClick={handleReply}>回复</a>
                </p>
                <Collapse isOpen={visible}>
                    <Comment
                        articleId={articleId}
                        replyTo={comment._id}
                        root={comment.root || comment._id}
                        showCancel
                        onCancel={handleCancel} />
                </Collapse>
            </div>
        </>
    );
}

class CommentList extends React.Component<Props & { classes: any }> {
    componentDidMount() {
        const {
            articleId,
            fetchComments
        } = this.props;

        fetchComments(articleId);
    }

    renderList(list: any, isChild = false, parent: any = null) {
        const {
            articleId,
            classes
        } = this.props;
        const map = new Map();

        if (parent) {
            map.set(parent._id, parent);
        }

        list.forEach((l: any) => {
            map.set(l._id, l);
        });

        return list.map((l: any) => {
            const c = l.children || [];

            if (isChild && !map.has(l.replyTo)) {
                return null;
            }

            return (
                <div key={l._id}>
                    <CommentItem
                        comment={l}
                        replyTo={map.get(l.replyTo)}
                        articleId={articleId}
                        isChild={isChild} />
                    {
                        !!c.length && (
                            <div className={classes["sub-comment-wrapper"]}>
                                {this.renderList(c as any, true, l)}
                            </div>
                        )
                    }
                </div>
            );
        });
    }

    render() {
        const {
            loading,
            list,
            classes
        } = this.props;

        return (
            <div className={classes["comment-wrapper"]}>
                <h4 className="my-3">全部评论</h4>
                {this.renderList(list)}
                {
                    loading && (
                        <div className="d-flex justify-content-center">
                            <Spinner animation="border" variant="info" />
                        </div>
                    )
                }
            </div>
        )
    }
}

export default (props: Props) => {
    const classes = useStyles();

    return <CommentList classes={classes} {...props} />
}