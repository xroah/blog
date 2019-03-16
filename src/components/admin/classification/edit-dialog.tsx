import * as React from "react";
import {
    Button,
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

interface Props {
    visible?: boolean;
    hideDialog?: () => any;
    type?: string;
    id?: string;
}

export default class EditDialog extends React.Component<Props> {

    state = {
        value: ""
    };

    clsInput: React.RefObject<HTMLInputElement> = React.createRef<HTMLInputElement>();

    handleEdit = (id: string, value: string) => {
        this.setState({
            value
        });
        this.openDialog("edit");
    }

    handleAdd = () => {
        this.openDialog("add");
    };

    save = () => {
        /* let { value, } = this.state;
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
        } */
    }

    handleDel = (id: string) => {
      /*   this.setState({
            id
        });
        hint.confirm("确定要删除吗?", this.del); */
    }

    del = () => {
        /*let { id } = this.state;
         _fetch(`${FETCH_CLS}?id=${id}`, {
            method: "delete"
        }).then(() => {
            message.success("删除成功!", 1500);
            this.fetchCls();
        }).catch(e => 0); */
    }

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
            title,
            value
        } = this.state;
        let {
            visible,
            hideDialog
        } = this.props;
        return (
            <section>
                <ClsList/>
                <Dialog
                    disableBackdropClick={true}
                    open={visible}
                    onClose={hideDialog}>
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