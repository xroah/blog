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

    renderList(list: any) {
        const { articleId } = this.props;
        const map = new Map();

        list.forEach((l: any) => {
            map.set(l._id, l);
        });

        return list.map((l: any) => (
            <div key={l._id}>
                <CommentItem
                    comment={l}
                    replyTo={map.get(l.replyTo)}
                    articleId={articleId} />
            </div>
        ));
    }

    render() {
        const {
            loading,
            list,
            classes
        } = this.props;

        return (
            <div className={classes["comment-wrapper"]}>
                <div className="mt-3 d-flex align-items-center">
                    <strong>全部评论</strong> 
                    <span className="ml-2">{list.length}</span>
                </div>
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