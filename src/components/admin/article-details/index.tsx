import * as React from "react";
import {
    Slide,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    List,
    ListItem
} from "@material-ui/core";
import { formatDate } from "@common/util";
import "./index.scss";

interface Props {
    article?: any;
    hideDialog: () => any;
    visible?: boolean;
}

export default class extends React.Component<Props> {

    render() {
        let {
            article,
            hideDialog,
            visible
        } = this.props;
        return (
            <Dialog
                open={visible}
                onBackdropClick={hideDialog}>
                {
                    article &&
                    (
                        <>
                            <DialogTitle>{article.title}</DialogTitle>
                            <DialogContent className="dialog-article-summary">
                                <List>
                                    <ListItem>
                                        <span className="label-text">所属分类:</span>
                                        <span className="summary">{article.clsName}</span>
                                    </ListItem>
                                    <ListItem>
                                        <span className="label-text">仅自己可见:</span>
                                        <span className="summary">{article.secret ? "是" : "否"}</span>
                                    </ListItem>
                                    <ListItem>
                                        <span className="label-text">创建时间:</span>
                                        <span className="summary">
                                        {formatDate(new Date(article.createTime), "YYYY-MM-DD hh:mm:ss")}
                                        </span>
                                    </ListItem>
                                    <ListItem>
                                        <span className="label-text">最后编辑时间:</span>
                                        <span className="summary">
                                             {formatDate(new Date(article.lastUpdateTime), "YYYY-MM-DD hh:mm:ss")}
                                        </span>
                                    </ListItem>
                                    <ListItem>
                                        <span className="label-text">总浏览量:</span>
                                        <span className="summary">{article.totalViewed}</span>
                                    </ListItem>
                                    <ListItem>
                                        <span className="label-text">今日浏览量:</span>
                                        <span className="summary">{article.todayViewed}</span>
                                    </ListItem>
                                </List>
                            </DialogContent>
                        </>
                    )
                }
                <DialogActions>
                    <Button onClick={hideDialog} color="primary">确定</Button>
                </DialogActions>
            </Dialog>
        );
    }
}