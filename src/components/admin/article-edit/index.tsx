import * as React from "react";
import Editor from "../editor";
import {
    Button,
    Switch
} from "@material-ui/core";
import {
    RouteComponentProps,
    Prompt
} from "react-router-dom";
import Loading from "@common/loading";
import _fetch from "@common/fetch";
import message from "@common/message";
import ClsList from "@containers/admin/article-edit-cls-list";
import {
    UPLOAD_FILE,
    FETCH_ARTICLES_ADMIN
} from "@common/api";
import "./index.scss";
import Quill from "quill";

export default class ArticleEdit extends React.Component<RouteComponentProps> {

    state = {
        title: "",
        cls: "",
        tags: "",
        secret: false,
        showLoading: false,
        saved: false
    };

    fileEl: React.RefObject<HTMLInputElement> = React.createRef();
    editorRef: React.RefObject<any> = React.createRef();
    titleEl: React.RefObject<HTMLInputElement> = React.createRef();
    id: string;

    async componentDidMount() {
        let locationState = this.props.history.location.state;
        if (locationState && locationState.id) {
            let ret: any = null;
            this.id = locationState.id;
            try {
                ret = await _fetch(`${FETCH_ARTICLES_ADMIN}?id=${this.id}`);
            } catch (error) {
                return;
            }
            if (!ret) {
                message.error("文章不存在");
                this.props.history.push("/xsys/articles/edit");
            } else {
                this.setState({
                    title: ret.title,
                    cls: ret.clsId,
                    secret: !!ret.secret,
                    tags: ret.tags.join(";")
                });
                this.editorRef.current.editor.root.innerHTML = ret.content;
            }
        }
    }

    handleChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        let nodeName = evt.target.nodeName.toLowerCase();
        if (nodeName === "input") {
            let tgt = evt.target as HTMLInputElement;
            if (tgt.type === "text") {
                let key = tgt.dataset.type;
                this.setState({
                    [key]: tgt.value
                });
            } else if (tgt.type === "checkbox") {
                this.setState({
                    secret: tgt.checked
                });
            }
        } else if (nodeName === "select") {
            this.setState({
                cls: evt.target.value
            });
        }
    }

    save = async () => {
        let {
            title,
            cls,
            tags,
            secret
        } = this.state;
        let editor: Quill = this.editorRef.current.editor;
        let text = editor.getText().trim(); //only get text, filter images
        let content = editor.root.innerHTML;
        if (!title.trim()) {
            return this.titleEl.current.focus();
        } else if (!cls) {
            return document.getElementById("clsSelect").focus();
        } else if (!text) {
            return message.error("请输入文章内容!");
        }
       tags = tags.trim();
       if (tags) {
            tags = tags.split(";") as any;
       } else {
           tags = [] as any;
       }
        let body: any = {
            title,
            clsId: cls,
            tags,
            secret,
            content,
            summary: text.substring(0, 150)
        };
        let method = "post";
        if (this.id) {
            method = "put";
            body.id = this.id;
        }
        this.setState({
            showLoading: true
        });
        try {
            await _fetch(FETCH_ARTICLES_ADMIN, {
                method,
                body
            });
            this.setState({
                saved: true,
                showLoading: false
            });
            this.props.history.push("/xsys/articles");
        } catch (error) {
            this.setState({
                showLoading: false
            });
        }
    }

    cancel = () => {
        this.props.history.goBack();
    }

    upload = () => {
        this.fileEl.current.click();
    }

    doUpload = async (file: File) => {
        let fd = new FormData();
        let editor = this.editorRef.current.editor;
        fd.append("attachment", file);
        this.setState({
            showLoading: true
        });
        let urlInfo: any = null;
        try {
            urlInfo = await _fetch(UPLOAD_FILE, {
                method: "post",
                body: fd
            });
        } catch (error) { }
        this.setState({
            showLoading: false
        });
        if (urlInfo) {
            editor.insertEmbed(editor.getText().length, "image", urlInfo.url);
        }
    }

    handleFileChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        let tgt = evt.target;
        let file = tgt.files[0];
        if (!file.type.startsWith("image")) {
            return message.error("请选择图片");
        }
        if (file.size > 2048000) {
            return message.error("大小超过限制(最多2MB)");
        }
        this.doUpload(file);
    }

    render() {
        let {
            title,
            cls,
            secret,
            tags,
            showLoading,
            saved
        } = this.state;

        return (
            <section className="article-edit-wrapper">
                {showLoading && <Loading />}
                <Prompt when={!saved} message="文章没有保存,确定要离开吗？" />
                <input
                    accept="image/jpeg, image/gif, image/png"
                    onChange={this.handleFileChange}
                    ref={this.fileEl}
                    type="file"
                    className="hidden" />
                <div className="row">
                    <span className="label-text">文章标题:</span>
                    <input
                        ref={this.titleEl}
                        type="text"
                        maxLength={20}
                        onChange={this.handleChange}
                        value={title}
                        data-type="title"
                        className="form-control form-item" />
                </div>
                <div className="row">
                    <span className="label-text">文章分类:</span>
                    <ClsList
                        value={cls}
                        className="form-item"
                        id="clsSelect"
                        onChange={this.handleChange} />
                </div>
                <div className="row">
                    <span className="label-text">仅自己可见:</span>
                    <Switch
                        onChange={this.handleChange}
                        checked={secret}
                        color="primary" />
                </div>
                <div className="row">
                    <span className="label-text">标签:</span>
                    <input
                        type="text"
                        onChange={this.handleChange}
                        value={tags}
                        data-type="tags"
                        placeholder="以半角英文分号分隔"
                        className="form-control form-item" />
                </div>
                <div className="row">
                    <span className="label-text align-top">文章内容:</span>
                    <Editor
                        ref={this.editorRef}
                        onUpload={this.upload}
                        className="form-item" />
                </div>
                <div className="row text-right">
                    <Button
                        variant="contained"
                        onClick={this.save}
                        color="primary">保存</Button>
                    <Button
                        style={{ marginLeft: 20 }}
                        onClick={this.cancel}
                        className="ml-10"
                        variant="contained"
                        color="secondary">取消</Button>
                </div>
            </section>
        );
    }
}