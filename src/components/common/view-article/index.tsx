import * as React from "react";
import {
    RouteComponentProps,
    withRouter
} from "react-router";
import { formatDate } from "@common/util";
import NotExists from "../no-article";
import CommentItem from "../comment-item";
import CommentEditor from "@containers/common/comment-editor";
import "./index.scss";

interface Props extends RouteComponentProps {
    fetchUrl?: string;
    started?: boolean;
    article?: any;
    comments?: Array<any>;
    fetchArticle?: (id: string) => any;
    fetchComments?: (id: string) => any;
    emptyComments?: () => any;
    updateViewedTimes?: boolean;
}

class ViewArticle extends React.Component<Props> {

    componentDidMount() {
        let {
            match,
            fetchArticle,
            fetchComments
        } = this.props;
        let params: any = match.params;
        if (params.id) {
            fetchArticle(params.id);
            fetchComments(params.id);
        }
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