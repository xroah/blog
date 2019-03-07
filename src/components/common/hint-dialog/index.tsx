import * as React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button
} from "@material-ui/core";
import { render, unmountComponentAtNode } from "react-dom";
import { Clear } from "@material-ui/icons";
import "./index.scss";

interface Props {
    title?: string;
    message?: string;
    ok?: boolean;
    cancel?: boolean;
    close?: boolean;
    onOk?: () => any;
    onCancel?: () => any;
    onClose?: () => any;
}

const noop = () => 0;

class HintDialog extends React.Component<Props> {

    state = {
        open: true
    }

    static defaultProps = {
        onOk: noop,
        onCancel: noop,
        ok: true,
        cancel: true,
        open: false,
        close: true
    };

    handleClose = () => {
        let { onClose } = this.props;
        this.setState({
            open: false
        });
        if (typeof onClose === "function") onClose();
    }

    handleOk = () => {
        let { onOk } = this.props;
        if (typeof onOk === "function") onOk();
        this.handleClose();
    }

    handleCancel = () => {
        let { onCancel } = this.props;
        if (typeof onCancel === "function") onCancel();
        this.handleClose();
    }

    render() {
        let { open } = this.state;
        let {
            title = "提示",
            message,
            ok,
            cancel
         } = this.props;
        return (
            <Dialog
                className="dialog"
                disableBackdropClick={true}
                open={open}
                transitionDuration={500}
                onClose={this.handleClose}>
                <DialogTitle>
                <span>{title}</span>
                <Button className="close-btn" color="secondary" onClick={this.handleClose}>
                    <Clear />
                </Button>
                </DialogTitle>
                <DialogContent className="hint-dialog-content">{message}</DialogContent>
                <DialogActions>
                    {ok && <Button color="primary" onClick={this.handleOk}>确定</Button>}
                    {cancel && <Button onClick={this.handleClose}>取消</Button>}
                </DialogActions>
            </Dialog>
        );
    }
}

function show(msg: string, config: Props) {
    if (!container.parentNode) {
        document.body.appendChild(container);
    }
    if (typeof config.onClose !== "function") {
        config.onClose = noop;
    }
    config.onClose = onClose(config.onClose);
    render(
        <HintDialog 
        message={msg}
        {...config}
        />,
        container
    );
}

function onClose(callback: () => any) {
    return () => {
        unmountComponentAtNode(container);
        callback();
    };
}

const container = document.createElement("div");

const dialog = {
    confirm(message: string, onOk?: () => any, config: Props = {}) {
        config.ok = true;
        config.cancel = true;
        show(message, {...config, onOk});
    },
    alert(message, onOk?: () => any, config: Props = {}) {
        config.ok = true;
        config.cancel = false;
        show(message, {...config, onOk})
    }
};

export default dialog;