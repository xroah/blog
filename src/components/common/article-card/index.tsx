import * as React from "react";
import {
    Button,
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
import "./index.scss";

export interface Props extends React.HTMLAttributes<any> {
    title: string;
    createTime: string;
    tags?: Array<string>;
    isAdmin?: boolean;
    viewedTimes?: number;
    comments?: number;
    secret?: boolean;
    index?: number;
    timeout?: number;
    showDetails?: (arg: any) => void;
}

export default class ArticleCard extends React.Component<Props> {

    static defaultProps = {
        isAdmin: false,
        secret: false,
        viewedTimes: 0,
        comments: 0,
        timeout: 0
    };

    render() {
        let {
            title,
            children,
            createTime,
            tags,
            isAdmin,
            viewedTimes,
            comments,
            secret,
            showDetails,
            timeout
        } = this.props;
        let date = formatDate(new Date(createTime));
        return (
            <div className="article-card">
                <Zoom in={true} timeout={timeout}>
                    <Card>
                        <CardHeader
                            title={
                                <span className="article-title">{title}</span>
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
                            <div className="article-summary">{children}</div>
                            <div className="tag-list">
                                {
                                    Array.isArray(tags) &&
                                    tags.map(t => <span className="tag" key={t}>{t}</span>)
                                }
                            </div>
                        </CardContent>
                        <CardActions className="article-action">
                            <div>
                                {
                                    isAdmin && (
                                        <span
                                            className="tag"
                                            style={{
                                                backgroundColor: "rgba(0, 132, 255, 0.15)",
                                                color: "#0084FF",
                                                border: "none"
                                            }}>
                                            {
                                                secret ? "私密" : "公开"
                                            }
                                        </span>
                                    )
                                }
                                <span className="action-item">
                                    <Visibility />{viewedTimes}
                                </span>
                                <span className="action-item">
                                    <Comment />{comments}
                                </span>
                            </div>
                            {
                                isAdmin &&
                                (
                                    <div>
                                        <Button className="action-item" variant="contained" color="primary">
                                            <Edit />
                                        </Button>
                                        <Button className="action-item" variant="contained" color="secondary">
                                            <Delete />
                                        </Button>
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