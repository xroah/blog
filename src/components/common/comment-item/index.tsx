import * as React from "react";
import {
    Button,
    Collapse
} from "@material-ui/core";
import { Reply } from "@material-ui/icons";
import { formatDate } from "@common/util";
import CommentEditor from "@containers/common/comment-editor";
import EventEmitter from "@common/event-emitter";
import "./index.scss";

const em = new EventEmitter();

let ins: CommentItem;

em.on("editor.visible.change", (current: CommentItem, visible: boolean) => {
    if (ins !== current) {
        if (ins && ins.state.editorVisible) {
            ins.setState({
                editorVisible: false
            });
        }
        ins = current;
    } else {
        if (!visible) {
            ins = null;
        }
    } 
});

interface Props {
    user: string;
    commentId?: string;
    replyUser?: any;
    rootComment?: string;
    content: string;
    time: string;
    articleId: string;
    userHomepage?: string;
}

export default class CommentItem extends React.Component<Props> {

    state = {
        editorVisible: false
    };

    handleReply = () => {
        let { editorVisible } = this.state;

        this.setState({
            editorVisible: !editorVisible
        });

        em.emit("editor.visible.change", this, !editorVisible);
    }

    handleUrl(url: string) {
        let reg = /^https?:\/\//;
        let reg2 = /[\\\/]+/;
        if (reg.test(url)) {
            return url;
        } else if (reg2.test(url)) {
            return url.replace(reg2, "//");
        }
        return `//${url}`;
    }

    getUser(username, homepage: string) {
        if (!username) {
            username = "路人甲";
        }
        return (
            !!homepage ?
                <a
                    href={this.handleUrl(homepage)}
                    className="comment-user"
                    target="_blank">
                    {username}
                </a> :
                <span className="comment-user">
                    {username}
                </span>
        );
    }

    render() {
        let {
            user,
            replyUser,
            content,
            time,
            articleId,
            commentId,
            rootComment,
            userHomepage
        } = this.props;
        let { editorVisible } = this.state;
        return (
            <div className="comment-item-wrapper">
                <p className="comment-info">
                    {this.getUser(user, userHomepage)}
                    {
                        replyUser && (
                            <>
                                <span>回复</span>
                                {this.getUser(replyUser.username, replyUser.userHomepage)}
                            </>
                        )
                    }
                    <span className="comment-time">
                        {formatDate(time, "YYYY-MM-DD hh:mm")}
                    </span>
                </p>
                <p className="comment-content">{content}</p>
                <div className="comment-action">
                    <Button onClick={this.handleReply} color="primary">
                        <Reply />{editorVisible ? "取消回复" : "回复"}
                    </Button>
                </div>
                <Collapse in={editorVisible}>
                    <CommentEditor
                        onSuccess={this.handleReply}
                        className="comment-list-editor"
                        articleId={articleId}
                        rootComment={rootComment}
                        replyTo={commentId} />
                </Collapse>
            </div>
        );
    }
}