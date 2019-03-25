import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import {
    Table,
    TableRow,
    TableCell,
    TableHead,
    TablePagination,
    TableBody,
    Checkbox,
    Toolbar,
    Typography,
    Tooltip,
    IconButton,
    Paper
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { ADMIN_COMMENTS } from "@common/api";
import _fetch from "@common/fetch";
import { formatDate } from "@common/util";
import { loading } from "@common/loading";
import message from "@common/message";
import hint from "@common/hint-dialog";
import "./index.scss";

const PAGE_SIZE = 10;

export default class CommentManagement extends React.Component<RouteComponentProps> {

    state = {
        page: 1,
        comments: [],
        selected: [],
        total: 1,
        allChecked: false
    };

    componentDidMount() {
        let {
            match: { params }
        } = this.props;
        let page = Number((params as any).page);
        if (page <= 0 || isNaN(page)) {
            page = 1;
        }
        this.setState({
            page
        });
        this.fetchComments(page);
    }

    async fetchComments(page) {
        loading.show();
        try {
            let ret: any = await _fetch(`${ADMIN_COMMENTS}?page=${page}`);
            this.setState({
                comments: ret.list,
                total: ret.total
            });
        } catch (error) { }
        loading.hide();
    }

    handleCheckAll = (evt: React.ChangeEvent<HTMLInputElement>) => {
        let { comments } = this.state;
        let checked = evt.target.checked;
        let selected = [];
        if (checked) {
            selected = comments.map(c => c._id);
        }
        this.setState({
            selected,
            allChecked: checked
        });
    }

    del = async () => {
        let {
            selected,
            page
        } = this.state;
        loading.show();
        try {
            await _fetch(ADMIN_COMMENTS, {
                method: "delete",
                body: {
                    ids: selected
                }
            });
            message.success("删除成功!");
            this.fetchComments(page);
            this.setState({
                selected: [],
                allChecked: false
            });
        } catch (error) { }
        loading.hide();
    }

    handleDel = () => {
        hint.confirm("确定要删除这些评论吗?", this.del);
    }

    //page of TablePagination starts from zero
    handlePageChange = (evt: any, page: number) => {
        let { history } = this.props;
        page += 1;
        this.setState({
            page,
            allChecked: false,
            selected: []
        });
        this.fetchComments(page);
        history.push(`/xsys/comments/${page}`);
    }

    renderTableHead() {
        let {
            allChecked,
            selected
        } = this.state;
        return (
            <TableHead>
                <TableRow>
                    <TableCell>
                        <Checkbox
                            indeterminate={!allChecked && !!selected.length}
                            onChange={this.handleCheckAll}
                            color="secondary"
                            checked={allChecked} />
                    </TableCell>
                    <TableCell>原文</TableCell>
                    <TableCell>评论内容</TableCell>
                    <TableCell>评论时间</TableCell>
                    <TableCell>评论人</TableCell>
                    <TableCell>评论人主页</TableCell>
                </TableRow>
            </TableHead>
        );
    }

    index(id: string) {
        return this.state.selected.indexOf(id);
    }

    handleCheckRow = (id: string) => {
        let {
            selected,
            comments
        } = this.state;
        let i = this.index(id);
        if (i >= 0) {
            selected.splice(i, 1);
        } else {
            selected.push(id);
        }
        let allChecked = comments.length === selected.length;
        this.setState({
            selected,
            allChecked
        });
    }

    renderTableBody() {
        let { comments } = this.state;
        if (!comments.length) {
            return (
                <TableRow>
                    <TableCell colSpan={6}>
                        <Typography
                            className="text-center"
                            variant="subtitle1">无记录</Typography>
                    </TableCell>
                </TableRow>
            );
        }
        return comments.map(
            c => {
                let selected = this.index(c._id) >= 0;
                return (
                    <TableRow
                        className="comment-row"
                        key={c._id}
                        selected={selected}
                        hover
                        onClick={() => this.handleCheckRow(c._id)}>
                        <TableCell>
                            <Checkbox checked={selected} />
                        </TableCell>
                        <TableCell>
                            <Tooltip title={c.article.title}>
                                <span>{c.article.title}</span>
                            </Tooltip>
                        </TableCell>
                        <TableCell>
                            <Tooltip title={c.content}>
                                <span>{c.content}</span>
                            </Tooltip>
                        </TableCell>
                        <TableCell>
                            {formatDate(c.createTime, "YYYY-MM-DD hh:mm:ss")}
                        </TableCell>
                        <TableCell>
                            <Tooltip title={c.username || ""}>
                                <span>{c.username}</span>
                            </Tooltip>
                        </TableCell>
                        <TableCell>
                            <Tooltip title={c.userHomepage || ""}>
                                <span>{c.userHomepage}</span>
                            </Tooltip>
                        </TableCell>
                    </TableRow>
                );
            }
        );
    }

    render() {
        let {
            selected,
            page,
            total
        } = this.state;
        return (
            <Paper className="comment-management-container">
                {
                    selected.length ?
                        (
                            <Toolbar className="selected-toolbar">
                                <Typography
                                    variant="subtitle1"
                                    color="secondary"
                                    className="selected-num">
                                    已选中{selected.length}条
                                </Typography>
                                <Tooltip title="删除">
                                    <IconButton
                                        onClick={this.handleDel}
                                        color="secondary">
                                        <Delete />
                                    </IconButton>
                                </Tooltip>
                            </Toolbar>
                        ) :
                        (
                            <Toolbar>
                                <Typography variant="subtitle1">评论列表:</Typography>
                            </Toolbar>
                        )

                }
                <Table className="comment-table">
                    {this.renderTableHead()}
                    <TableBody>
                        {this.renderTableBody()}
                    </TableBody>
                </Table>
                {
                    total > PAGE_SIZE &&
                    <TablePagination
                        className="pagination"
                        count={total}
                        component="div"
                        onChangePage={this.handlePageChange}
                        rowsPerPage={PAGE_SIZE}
                        rowsPerPageOptions={[]}
                        page={page - 1}
                        backIconButtonProps={{
                            title: "上一页"
                        }}
                        nextIconButtonProps={{
                            title: "下一页"
                        }} />
                }
            </Paper>
        );
    }

}