import * as React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import Snackbar, { SnackbarOrigin } from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import "./index.scss";

interface Props {
    type: string;
    msg: string;
    onExited?: Function
}

function _SnackBarContent(props: Props) {
    const { msg, type } = props;

    return (
        <SnackbarContent
            className={`message-${type}`}
            message={<span>{msg}</span>}
        />
    );
}

interface SnackbarProps extends Props {
    autoHideDuration?: number;
    position?: SnackbarOrigin;
}

class _Snackbar extends React.Component<SnackbarProps> {
    state = {
        visible: true
    };

    onExited = () => {
        message.mounted = false;
        unmountComponentAtNode(message.container);
    }

    onClose = (evt: any, reason: string) => {
        if (reason !== "clickaway") {
            this.setState({ visible: false });
        }
    }

    render() {
        let { autoHideDuration = 3000, position, msg, type } = this.props;
        let { visible } = this.state;
        if (!position) {
            position = {
                horizontal: "center",
                vertical: "top"
            };
        }

        return (
            <Snackbar
                anchorOrigin={position}
                autoHideDuration={autoHideDuration}
                style={{ top: 20 }}
                onExited={this.onExited}
                onClose={this.onClose}
                open={visible}>
                <_SnackBarContent msg={msg} type={type} />
            </Snackbar>
        );
    }
}

function show(msg: string, type: string, duration: number) {
    let _msg = message;
    if (!document.body.contains(_msg.container)) {
        _msg.container.classList.add("message-wrapper");
        document.body.appendChild(_msg.container);
    }
    if (_msg.timer) {
        clearTimeout(_msg.timer);
        _msg.timer = null;
    }
    if (_msg.mounted) {
        unmountComponentAtNode(_msg.container);
    }
    _msg.mounted = true;
    render(
        <_Snackbar
            msg={msg}
            type={type}
            autoHideDuration={duration} />,
        _msg.container
    );
}

const message = {
    container: document.createElement("div"),
    timer: null,
    mounted: null,
    success(msg: string, duration: number = 3000) {
        show(msg, "success", duration);
    },
    info(msg: string, duration: number = 3000) {
        show(msg, "info", duration);
    },
    error(msg: string, duration: number = 3000) {
        show(msg, "error", duration);
    }
};

export default message;