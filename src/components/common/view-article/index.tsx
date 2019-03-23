import * as React from "react";
import {
    RouteComponentProps,
    withRouter
} from "react-router";
import { formatDate } from "@common/util";
import NotExists from "../no-article";
import CommentItem from "../comment-item";
import CommentEditor from "@containers/common/comment-editor";
import { UPDATE_VIEWED_TIME } from "@common/api";
import _fetch from "@common/fetch";
import "./index.scss";

interface Props extends RouteComponentProps {
    fetchUrl?: string;
    started?: boolean;
    article?: any;
    comments?: Array<any>;
    updateViewedTime?: boolean;
    fetchArticle?: (id: string) => any;
    fetchComments?: (id: string) => any;
    emptyComments?: () => any;
}

class ViewArticle extends React.Component<Props> {

    componentWillMount() {
        this.props.emptyComments();
    }

    componentDidMount() {
        let {
            match,
            fetchArticle,
            fetchComments,
            updateViewedTime
        } = this.props;
        let params: any = match.params;
        fetchArticle(params.id);
        fetchComments(params.id);
        if (updateViewedTime) {
            _fetch(UPDATE_VIEWED_TIME, {
                method: "post",
                noErrorHint: true,
                body: {
                    articleId: params.id
                }
            }).catch(e => e);
        }
    }

    updateTimes() {

    }

    renderComments() {
        let { comments } = this.props;
        return comments.map(
            c => (
                <CommentItem
                    key={c._id}
                    articleId={c.articleId}
                    userHomepage={c.userHomepage}
                    user={c.username}
                    time={c.createTime}
                    commentId={c._id}
                    rootComment={c.rootComment || c._id}
                    replyUser={c.replyToUser}
                    content={c.content} />
            )
        );
    }

    render() {
        let {
            article,
            started,
            comments
        } = this.props;
        return (
            <section className="view-article-container">
                {
                    started ? null : article ?
                        (
                            <>
                                <div className="article-content-wrapper">
                                    <h2 className="text-center article-title">{article.title}</h2>
                                    <div className="text-center other-info">
                                        <span>
                                            日期:{formatDate(article.createTime, "YYYY-MM-DD hh:mm")}
                                        </span>
                                        <span>所属分类:{article.clsName}</span>
                                    </div>
                                    <div
                                        dangerouslySetInnerHTML={{ __html: article.content }}
                                        className="article-content" />
                                    <h4>发表评论:</h4>
                                    <CommentEditor articleId={article._id} />
                                </div>
                                <div className="comment-list-wrapper">
                                    <div className="comment-header">
                                        {comments.length}条评论
                                    </div>
                                    <div className="comment-body">
                                        {this.renderComments()}
                                    </div>
                                </div>
                            </>
                        )
                        : <NotExists message="文章不存在或被博主删除" />
                }
            </section>
        );
    }
}

export default withRouter(ViewArticle);