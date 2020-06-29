import React from "react";
import { createUseStyles } from "react-jss";
import Spinner from "reap-ui/lib/Spinner";
import CommentItem from "./comment-item";

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
                        articleId={articleId} />
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
                <h4 className="mt-3">全部评论</h4>
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