import * as React from "react";
import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    IconButton,
    Zoom
} from "@material-ui/core";
import {
    Edit,
    Delete,
    MoreVert,
    Visibility,
    Comment
} from "@material-ui/icons";
import { formatDate } from "@common/util";
import {
    RouteComponentProps,
    withRouter
} from "react-router-dom";
import classnames from "classnames";
import hint from "@common/hint-dialog";
import "./index.scss";

export interface Props extends React.HTMLAttributes<any>, RouteComponentProps {
    id: string;
    isAdmin?: boolean;
    timeout?: number;
    article?: any;
    showDetails?: (arg: any) => void;
    delArticle?: (id: string) => void;
}

class ArticleCard extends React.Component<Props> {

    static defaultProps = {
        isAdmin: false,
        timeout: 0
    };

    handleEdit = () => {
        let {
            id,
            history
        } = this.props;
        history.push("/xsys/articles/edit", {
            id
        });
    }

    handleDel = () => {
        let {
            id,
            delArticle
        } = this.props;
        hint.confirm("确定要删除这篇文章吗?", () => {
            delArticle(id);
        });
    }

    viewArticle = () => {
        let {
            id,
            history
        } = this.props;
        history.push(`/xsys/articles/${id}`);
    }

    render() {
        let {
            children,
            isAdmin,
            showDetails,
            timeout,
            article
        } = this.props;
        let date = formatDate(new Date(article.createTime));
        return (
            <div className="article-card">
                <Zoom in={true} timeout={timeout}>
                    <Card>
                        <CardHeader
                            title={
                                <span className="article-title">
                                    {article.title}
                                </span>
                            }
                            subheader={date}
                            action={
                                isAdmin ?
                                    (
                                        <IconButton onClick={showDetails}>
                                            <MoreVert />
                                        </IconButton>
                                    ) : null
                            } />
                        <CardContent style={{ paddingTop: 0 }}>
                            <div onClick={this.viewArticle} className="article-summary">{children}</div>
                            <div className="tag-list">
                                {
                                    Array.isArray(article.tags) &&
                                    article.tags.map(
                                        t => t ? <span className="tag" key={t}>{t}</span> : null
                                    )
                                }
                            </div>
                        </CardContent>
                        <CardActions className="article-action">
                            <div>
                                {
                                    isAdmin && (
                                        <span
                                            className={classnames(
                                                "tag permission-tag",
                                                article.secret ? "secret" : ""
                                            )}>
                                            {
                                                article.secret ? "私密" : "公开"
                                            }
                                        </span>
                                    )
                                }
                                <span className="action-item">
                                    <Visibility />{article.totalViewed}
                                </span>
                                <span className="action-item">
                                    <Comment />{article.comments || 0}
                                </span>
                            </div>
                            {
                                isAdmin &&
                                (
                                    <div>
                                        <IconButton
                                            onClick={this.handleEdit}
                                            color="primary">
                                            <Edit />
                                        </IconButton>
                                        <IconButton
                                            onClick={this.handleDel}
                                            color="secondary">
                                            <Delete />
                                        </IconButton>
                                    </div>
                                )
                            }
                        </CardActions>
                    </Card>
                </Zoom>
            </div>
        );
    }
}

export default withRouter(ArticleCard);