import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import Comment from "../components/publish-comment";
import Spinner from "reap-ui/lib/Spinner";
import { Collapse } from "reap-ui/lib/Collapse";

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
        marginTop: 20
    },
    "sub-comment-wrapper": {
        paddingLeft: 20
    }
});

interface ItemProps {
    comment: any;
    articleId: string;
}

const useItemStyles = createUseStyles({
    "comment-item": {

    }
});

function CommentItem(props: ItemProps) {
    const {
        comment,
        articleId
    } = props;
    const classes = useItemStyles();
    const [visible, updateVisible] = useState(false);
    const handleCancel = () => updateVisible(false);

    return (
        <>
            <div className={classes["comment-item"]}>
                {comment.content}
                <Collapse isOpen={visible}>
                    <Comment
                        articleId={articleId}
                        replyTo={comment._id}
                        root={comment.root || comment._id}
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

    renderList(list: any) {
        const {
            articleId,
            classes
        } = this.props;

        return list.map((l: any) => {
            const c = l.children || [];

            return (
                <>
                    <CommentItem
                        key={l._id}
                        comment={l}
                        articleId={articleId} />
                    {
                        !!c.length && (
                            <div className={classes["sub-comment-wrapper"]}>
                                {this.renderList(c as any)}
                            </div>
                        )
                    }
                </>
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
                <h4 className="my-3">全部评论：{list.length}</h4>
                {this.renderList(list)}
                {
                    loading && (
                        <Spinner animation="border" variant="info" />
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