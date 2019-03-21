import * as React from "react";
import Textarea from "react-textarea-autosize";
import {
    Button,
    Checkbox,
    FormControlLabel
} from "@material-ui/core";
import { FETCH_COMMENT } from "@common/api";
import _fetch from "@common/fetch";
import message from "@common/message";
import "./index.scss";

interface Props {
    articleId: string;
    replyTo?: string;
    saveComment?: (body: any, success?: Function, error?: Function) => any;
}

const SAVE_INFO_KEY = "userInfo";

export default class CommentEditor extends React.Component<Props> {

    state = {
        username: "",
        homepage: "",
        saveInfo: false,
        content: "",
        disabled: false
    };

    textarea: HTMLTextAreaElement;

    componentDidMount() {
        let info = JSON.parse(localStorage.getItem(SAVE_INFO_KEY));
        if (info) {
            this.setState({
                username: info.username,
                homepage: info.homepage
            });
        }
    }

    enable = () => {
        this.setState({
            disabled: false
        });
    }

    success = () => {
        this.setState({
            content: ""
        });
        this.enable();
    }

    handleClick = async () => {
        let {
            username,
            homepage,
            saveInfo,
            content
        } = this.state;
        let {
            articleId,
            replyTo,
            saveComment
        } = this.props;
        username = username.trim();
        homepage = homepage.trim();
        content = content.trim();
        if (!content) {
            return this.textarea.focus();
        }
        if (saveInfo && (username || homepage)) {
            localStorage.setItem(SAVE_INFO_KEY, JSON.stringify({
                username,
                homepage
            }));
        }
        this.setState({
            disabled: true
        });
        saveComment(
            {
            username,
            userHomepage: homepage,
            content,
            articleId,
            replyTo
        },
        this.success,
        this.enable
        );
    }

    handleChange = (type: string) => {
        return (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            if (type === "saveInfo") {
                let tgt = evt.target as HTMLInputElement;
                this.setState({
                    saveInfo: tgt.checked
                });
            } else {
                this.setState({
                    [type]: evt.target.value
                });
            }
        }
    }

    render() {
        let {
            username,
            homepage,
            saveInfo,
            content,
            disabled
        } = this.state;
        return (
            <div className="comment-editor-wrapper">
                <div className="user-info">
                    <input
                        type="text"
                        value={username}
                        onChange={this.handleChange("username")}
                        placeholder="您的姓名"
                        className="form-control" />
                    <input
                        type="text"
                        value={homepage}
                        onChange={this.handleChange("homepage")}
                        placeholder="您的主页"
                        className="form-control" />
                    <FormControlLabel
                        className="remember"
                        control={
                            <Checkbox
                                checked={saveInfo}
                                onChange={this.handleChange("saveInfo")}
                                color="primary" />
                        }
                        label="记住个人信息"
                    />
                </div>
                <div className="comment-actions">
                    <Textarea
                        inputRef={ta => this.textarea = ta}
                        maxLength={200}
                        value={content}
                        onChange={this.handleChange("content")}
                        placeholder="写下您的评论..."
                        className="form-control comment-content" />
                    <Button
                        disabled={disabled}
                        onClick={this.handleClick}
                        className="submit"
                        variant="contained"
                        color="primary">发表</Button>
                </div>
            </div>
        );
    }
}