import * as React from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Button
} from "@material-ui/core";
import message from "@common/message";
import _fetch from "@common/fetch";
import { MODIFY_PASSWORD } from "@common/api";
import md5 from "blueimp-md5";
import "./index.scss";

interface Props {
    visible?: boolean;
    hideDialog?: () => void;
}

export default class ModifyPwd extends React.Component<Props> {
    state = {
        origPwd: "",
        newPwd: "",
        rePwd: "",
        disabled: false
    }

    origPwdRef: React.RefObject<HTMLInputElement> = React.createRef();
    newPwdRef: React.RefObject<HTMLInputElement> = React.createRef();
    rePwdRef: React.RefObject<HTMLInputElement> = React.createRef();

    close = () => {
        this.setState({
            origPwd: "",
            newPwd: "",
            rePwd: ""
        });
        this.props.hideDialog();
    }

    handleChange = (type: string, evt: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            [type]: evt.target.value
        });
    }

    save = async () => {
        let {
            origPwd,
            newPwd,
            rePwd
        } = this.state;
        let {
            origPwdRef,
            newPwdRef,
            rePwdRef
        } = this;
        if (!origPwd) {
            origPwdRef.current.focus();
        } else if (!newPwd) {
            newPwdRef.current.focus();
        } else if (!rePwd) {
            rePwdRef.current.focus();
        }
        if (newPwd !== rePwd) {
            return message.error("新密码和重复密码输入不一致");
        }
        this.setState({
            disabled: true
        });
        try {
            await _fetch(MODIFY_PASSWORD, {
                method: "post",
                body: {
                    origPwd: md5(origPwd),
                    newPwd: md5(newPwd)
                }
            });
            this.props.hideDialog();
            message.success("修改成功");
        } catch (error) { }
        this.setState({
            disabled: false
        });
    }

    render() {
        let {
            origPwd,
            newPwd,
            rePwd,
            disabled
        } = this.state;
        return (
            <Dialog open={this.props.visible} className="modify-pwd-dialog">
                <DialogTitle>修改密码</DialogTitle>
                <DialogContent>
                    <div className="pwd-row">
                        <TextField
                            inputRef={this.origPwdRef}
                            type="password"
                            placeholder="原密码"
                            onChange={evt => this.handleChange("origPwd", evt as any)}
                            value={origPwd} />
                    </div>
                    <div className="pwd-row">
                        <TextField
                            inputRef={this.newPwdRef}
                            type="password"
                            placeholder="新密码"
                            onChange={evt => this.handleChange("newPwd", evt as any)}
                            value={newPwd} />
                    </div>
                    <div className="pwd-row">
                        <TextField
                            inputRef={this.rePwdRef}
                            type="password"
                            placeholder="重复密码"
                            onChange={evt => this.handleChange("rePwd", evt as any)}
                            value={rePwd} />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.save} disabled={disabled} color="primary">
                        确定
                    </Button>
                    <Button onClick={this.close}>
                        取消
                    </Button>
                </DialogActions>
            </Dialog>
        );
    };
}