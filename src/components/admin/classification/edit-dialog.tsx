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
    value?: string;
    save?: (arg: Object) => any;
}

export default class EditDialog extends React.Component<Props> {

    state = {
        value: ""
    };

    clsInput: React.RefObject<HTMLInputElement> = React.createRef<HTMLInputElement>();

    save = () => {
        let {
            save,
            id
        } = this.props;
        let { value } = this.state;
        if (!value.trim()) {
            return this.clsInput.current.focus();
        }
        save({
            id,
            name: this.state.value
        });
    }

    handleClose = () => {
        this.props.hideDialog();
    }

    handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            value: evt.target.value
        });
    }

    handleEnter = () => {
        let { value } = this.props;
        this.setState({
            value
        });
        this.clsInput.current.focus();
    }

    handleExit = () => {
        this.setState({
            value: ""
        });
    };

    handleKeyDown = (evt: React.KeyboardEvent) => {
        let key = evt.key.toLowerCase();
        if (key === "enter") {
            this.save();
        }
    }

    render() {
        let {
            value
        } = this.state;
        let {
            visible,
            type
        } = this.props;
        let title = type === "edit" ? "编辑分类" : "添加分类";
        return (
            <section>
                <Dialog
                    disableBackdropClick={true}
                    onEnter={this.handleEnter}
                    onExit={this.handleExit}
                    open={visible}>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogContent>
                        <TextField
                            inputRef={this.clsInput}
                            style={{ width: 240 }}
                            onChange={this.handleChange}
                            onKeyDown={this.handleKeyDown}
                            value={value} />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.save} color="primary">确定</Button>
                        <Button onClick={this.handleClose}>取消</Button>
                    </DialogActions>
                </Dialog>
            </section>
        );
    }
}