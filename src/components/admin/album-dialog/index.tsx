import * as React from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Switch,
    Button,
    Slide
} from "@material-ui/core";
import Textarea from "react-textarea-autosize";
import "./index.scss";

interface Props {
    visible?: boolean;
    mode: "add" | "edit",
    curAlbum: any;
    hideDialog?: () => any;
    save?: (body: Object, success?: Function, error?: Function) => any;
}

export default class AlbumDialog extends React.Component<Props> {

    textarea: HTMLTextAreaElement;
    input: React.RefObject<HTMLInputElement> = React.createRef();

    state = {
        name: "",
        desc: "",
        secret: true,
        disabled: false
    };
    
    handleEnter = () => {
        let state = {
            name: "",
            desc: "",
            secret: true,
            disabled: false
        };
        let {
            curAlbum,
            mode
        } = this.props;
        if (mode === "edit") {
            state.name = curAlbum.name;
            state.secret = curAlbum.secret;
            state.desc = curAlbum.desc || "";
        }
        this.input.current.focus();
        this.setState(state);
    }

    enable = () => {
        this.setState({
            disabled: false
        });
    }

    handleOk = () => {
        let {
            props: {
                hideDialog,
                save,
                mode,
                curAlbum
            },
            state: {
                name,
                desc,
                secret
            },
            input: { current: input }
        } = this;
        let id: any;
        if (!name.trim()) {
            return input.focus();
        }
        if (mode === "edit") {
            id = curAlbum._id;
        }
        this.setState({
            disabled: true
        });
        save(
            {
                id,
                name,
                desc,
                secret
            },
            () => {
                this.enable();
                hideDialog();
            },
            this.enable
        );
    }

    handleCancel = () => {
        this.props.hideDialog();
    }

    handleChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const tgt = evt.target;
        const nodeName = tgt.nodeName.toLowerCase();
        if (nodeName === "textarea") {
            this.setState({
                desc: tgt.value
            });
        } else {
            if (tgt.type === "text") {
                this.setState({
                    name: tgt.value
                });
            } else {
                this.setState({
                    secret: (tgt as HTMLInputElement).checked
                });
            }
        }
    }

    render() {
        let {
            props: {
                visible
            },
            state: {
                name,
                desc,
                secret,
                disabled
            }
        } = this;
        return (
            <Dialog
                open={visible}
                onEnter={this.handleEnter}
                className="edit-album-dialog">
                <DialogTitle>
                    <span>新增相册</span>
                </DialogTitle>
                <DialogContent className="dialog-content">
                    <div className="form-row">
                        <span className="label-text">
                            <span className="red-text">*</span>
                            相册名称
                        </span>
                        <input
                            type="text"
                            maxLength={20}
                            value={name}
                            onChange={this.handleChange}
                            ref={this.input}
                            className="form-control" />
                    </div>
                    <div className="form-row">
                        <span 
                        style={{alignSelf: "flex-start"}}
                        className="label-text">相册描述</span>
                        <Textarea
                            style={{ minHeight: 32 }}
                            value={desc}
                            onChange={this.handleChange}
                            inputRef={el => this.textarea = el}
                            maxLength={200}
                            className="form-control" />
                    </div>
                    <div className="form-row">
                        <span className="label-text">仅自己可见</span>
                        <Switch
                            checked={secret}
                            onChange={this.handleChange}
                            color="primary" />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button
                        disabled={disabled}
                        onClick={this.handleOk}
                        color="primary">确定</Button>
                    <Button onClick={this.handleCancel}>取消</Button>
                </DialogActions>
            </Dialog>
        );
    }
}