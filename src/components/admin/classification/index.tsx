import * as React from "react";
import {
    Card,
    CardHeader,
    CardContent,
    Button,
    Zoom,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField
} from "@material-ui/core";
import {
    Edit,
    Delete,
    Add
} from "@material-ui/icons";
import { formatDate } from "@common/util";
import _fetch from "@common/fetch";
import hint from "@common/hint-dialog";
import message from "@common/message";
import ClsList from "@containers/admin/cls-list";
import "./index.scss";

export default class Classification extends React.Component {

    state = {
        list: [],
        open: false,
        type: "",
        title: "",
        value: "",
        id: ""
    };

    clsInput: React.RefObject<HTMLInputElement> = React.createRef<HTMLInputElement>();

    handleEdit = (id: string, value: string) => {
        this.setState({
            id,
            value
        });
        this.openDialog("edit");
    }

    handleAdd = () => {
        this.openDialog("add");
    };

    /* save = () => {
        let { value, id } = this.state;
        let body: any = {
            name: value
        };
        let method = "post";
        if (id) {
            body.id = id;
            method = "put";
        }
        if (!value.trim()) {
            return this.clsInput.current.focus();
        }
        _fetch(FETCH_CLS, {
            method,
            body
        }).then(() => {
            message.success("保存成功!");
            this.handleClose();
        }).catch(e => 0);
    }

    handleDel = (id: string) => {
        this.setState({
            id
        });
        hint.confirm("确定要删除吗?", this.del);
    }

    del = () => {
        let { id } = this.state;
        _fetch(`${FETCH_CLS}?id=${id}`, {
            method: "delete"
        }).then(() => {
            message.success("删除成功!", 1500);
            this.fetchCls();
        }).catch(e => 0);
    } */

    handleClose = () => {
        this.setState({
            open: false,
            type: "",
            id: "",
            value: ""
        });
    }

    openDialog = (type: string, value: string = "") => {
        let title = "";
        if (type === "edit") {
            title = "编辑分类";
        } else if (type === "add") {
            title = "添加分类";
        }
        this.setState({
            open: true,
            type,
            title
        });
    }

    handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            value: evt.target.value
        });
    }

    render() {
        let {
            open,
            title,
            value
        } = this.state;
        return (
            <section>
                <ClsList/>
                <Dialog
                    disableBackdropClick={true}
                    open={open}
                    onClose={this.handleClose}>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogContent>
                        <TextField
                            inputRef={this.clsInput}
                            style={{ width: 240 }}
                            onChange={this.handleChange}
                            value={value} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.save} color="primary">确定</Button>
                        <Button onClick={this.handleClose}>取消</Button>
                    </DialogActions>
                </Dialog>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleAdd}
                    className="add-right-bottom">
                    <Add fontSize="large" />
                </Button>
            </section>
        );
    }
}