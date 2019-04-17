import * as React from "react";
import { Button } from "@material-ui/core";
import AutoSizeTextArea from "react-textarea-autosize";
import _fetch from "@common/fetch";
import { UPDATE_VERSION } from "@common/api";
import { loading } from "@common/loading";
import message from "@common/message";
import "./index.scss";

export default class Version extends React.Component {

    textarea: HTMLTextAreaElement;
    input: React.RefObject<HTMLInputElement> = React.createRef();

    state = {
        version: "",
        content: ""
    };

    componentDidMount() {
        document.title = "版本";
    }

    getTextarea = (el: HTMLTextAreaElement) => {
        this.textarea = el;
    }

    handleChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let tgt = evt.target;
        let nodeName = tgt.nodeName.toLowerCase();
        let value = tgt.value;
        let key: string;
        if (nodeName === "input") {
            key = "version";
        } else if (nodeName === "textarea") {
            key = "content";
        }
        this.setState({
            [key]: value
        });
    }

    handleSave = () => {
        let {
            version,
            content
        } = this.state;
        if (!version) {
            return this.input.current.focus();
        } else if (!content) {
            return this.textarea.focus();
        }
        this.save(version, content);
    }

    save = async (version: string, content: string) => {
        loading.show();
        try {
            await _fetch(UPDATE_VERSION, {
                method: "POST",
                body: {
                    version,
                    content
                }
            });
            this.setState({
                version: "",
                content: ""
            });
            message.success("保存成功!");
        } catch (err) {}
        loading.hide();
    }

    render() {
        let {
            version,
            content
        } = this.state;
        return (
            <div className="version-container">
                <div className="row">
                    <span>版本号</span>
                    <input
                        type="text"
                        ref={this.input}
                        value={version}
                        onChange={this.handleChange}
                        className="form-control" />
                </div>
                <div className="row">
                    <span>更新内容</span>
                    <AutoSizeTextArea
                        inputRef={this.getTextarea}
                        value={content}
                        onChange={this.handleChange}
                        className="form-control content" />
                </div>
                <div style={{
                    display: "flex",
                    justifyContent: "flex-end"
                }}>
                    <Button
                        onClick={this.handleSave}
                        variant="contained"
                        color="primary">保存</Button>
                </div>
            </div>
        );
    }

}