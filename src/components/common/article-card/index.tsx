import * as React from "react";
import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    IconButton,
    Zoom,
    Typography
} from "@material-ui/core";
import {
    Edit,
    Delete,
    Info,
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

const tag = require("@images/tag.png");

export interface Props extends React.HTMLAttributes<any>, RouteComponentProps {
    id: string;
    isAdmin?: boolean;
    timeout?: number;
    article: any;
    viewPath: string;
    isDraft?: boolean;
    showDetails?: (arg: any) => void;
    delArticle?: (id: string) => void;
}

class ArticleCard extends React.Component<Props> {

    static defaultProps = {
        isAdmin: false,
        timeout: 0,
        showDetails: () => 0,
        delArticle: () => 0
    };

    handleEdit = () => {
        let {
            id,
            history,
            location: { search },
            isDraft
        } = this.props;
        history.push("/xsys/article/edit", {
            id,
            search,
            isDraft
        });
    }

    handleDel = () => {
        let {
            id,
            delArticle,
            article
        } = this.props;
        hint.confirm(
            <>
                确定要删除
                <Typography color="secondary" inline={true}>{article.title}</Typography>
                吗?
            </>,
            () => {
                delArticle(id);
            });
    }

    viewArticle = () => {
        let {
            id,
            history,
            viewPath,
            isDraft
        } = this.props;
        if (!isDraft) history.push(`${viewPath}/${id}`);
    }

    render() {
        let {
            isAdmin,
            showDetails,
            timeout,
            article,
            isDraft
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
                                isAdmin && !isDraft ?
                                    (
                                        <IconButton onClick={showDetails}>
                                            <Info />
                                        </IconButton>
                                    ) : null
                            } />
                        <CardContent className="card-content">
                            <div 
                                onClick={this.viewArticle} 
                                className={classnames("article-summary", isDraft ? "draft" : "")}>
                                {article.summary}...
                            </div>
                            <div className="tag-list">
                                {
                                    Array.isArray(article.tags) &&
                                    <>
                                        <img src={tag} />
                                        {article.tags.map(
                                            t => t ? <span className="tag" key={t}>{t}</span> : null
                                        )}
                                    </>
                                }
                            </div>
                        </CardContent>
                        <CardActions className="article-action">
                            <div>
                                {
                                    !isDraft && (
                                        <>
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
                                                <Comment />{article.comments ? article.comments.count : 0}
                                            </span>
                                        </>
                                    )
                                }
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