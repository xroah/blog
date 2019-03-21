import * as React from "react";
import { Button } from "@material-ui/core";
import { Reply } from "@material-ui/icons";
import { formatDate } from "@common/util";
import "./index.scss";

interface Props {
    user: string;
    replyTo?: string;
    content: string;
    time: string;
    articleId: string;
}

export default class CommentItem extends React.Component<Props> {

    handleReply() {

    }

    render() {
        let {
            user,
            replyTo,
            content,
            time
        } = this.props;
        return (
            <div className="comment-item-wrapper">
                <p className="comment-info">
                    <span className="comment-user">{user}</span>
                    {
                        replyTo && (
                            <>
                                <span>回复</span>
                                <span className="comment-user">{replyTo}</span>
                            </>
                        )
                    }
                    <span className="comment-time">
                        {formatDate(time, "YYYY-MM-DD hh:mm")}
                    </span>
                </p>
                <p className="comment-content">{content}</p>
                <div className="comment-action">
                    <Button color="primary">
                        <Reply />回复
                    </Button>
                </div>
            </div>
        );
    };
}