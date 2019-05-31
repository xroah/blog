import * as React from "react";
import Editor from "../editor";
import {
    Button,
    Switch
} from "@material-ui/core";
import {
    RouteComponentProps,
    Prompt,
    Link
} from "react-router-dom";
import { loading } from "@common/loading";
import _fetch from "@common/fetch";
import message from "@common/message";
import ClsList from "@containers/admin/article-edit-cls-list";
import NoArticle from "@common/no-article";
import { UPLOAD_FILE } from "@common/api";
import "./index.scss";
import Quill from "quill";

interface Props extends RouteComponentProps {
    saveArticle?: (arg: any) => any;
    saveToDrafts?: (arg: any) => any;
    changeSaved?: (arg?: any) => any;
    saved?: boolean;
    fetchArticleById?: (body: any, success: Function, error: Function) => any;
}

export default class ArticleEdit extends React.Component<Props> {

    state = {
        title: "",
        cls: "",
        tags: "",
        secret: false,
        error: false,
        message: "",
        backUrl: ""
    };

    fileEl: React.RefObject<HTMLInputElement> = React.createRef();
    editorRef: React.RefObject<any> = React.createRef();
    titleEl: React.RefObject<HTMLInputElement> = React.createRef();
    id: string;
    isDraft: boolean;
    uploadedImages: Array<any> = [];

    fetchSuccess = (ret: any) => {
        if (!ret) {
            this.setState({
                error: true,
                message: "文章不存在"
            });
            document.title = "编辑-文章不存在"
            return;
        }
        this.setState({
            title: ret.title,
            cls: ret.clsId,
            secret: !!ret.secret,
            tags: ret.tags.join(";")
        });
        const editor = this.editorRef.current.editor as Quill;
        editor.root.innerHTML = ret.content;
        document.title = `编辑-${ret.title}`;
        setTimeout(() => {
            this.uploadedImages = this.getImages();
        });
    }

    fetchError = () => {
        this.setState({
            error: true,
            message: "获取文章出错"
        });
    }

    async componentDidMount() {
        let {
            changeSaved,
            fetchArticleById,
            history: { location: { state } }
        } = this.props;
        changeSaved(false);
        if (state) {
            if (state.id) {
                this.id = state.id;
                fetchArticleById(
                    {
                        id: state.id,
                        isDraft: !!state.isDraft
                    },
                    this.fetchSuccess,
                    this.fetchError
                );
                this.isDraft = !!state.isDraft;
            }
            this.setState({
                backUrl: state.url
            });
        }
        window.onbeforeunload = () => "文章未保存,确定要离开吗?";
        document.title = "文章编辑";
    }

    componentWillUnmount() {
        window.onbeforeunload = null;
    }

    getImages = () => {
        let editor: Quill = this.editorRef.current.editor;
        let content = editor.getContents();
        let images = [];
        content.ops.forEach((item: any) => {
            if (item.insert && item.insert.image) {
                images.push(item.insert.image);
            }
        });
        return images;
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

    getData = () => {
        let {
            title,
            cls,
            tags,
            secret
        } = this.state;
        let editor: Quill = this.editorRef.current.editor;
        let text = editor.getText().trim(); //only get text, filter images
        let content = editor.root.innerHTML;
        tags = tags.trim();
        if (tags) {
            tags = tags.split(";") as any;
        } else {
            tags = [] as any;
        }
        return {
            title,
            cls,
            tags,
            secret,
            content,
            text
        };
    }

    save = async () => {
        let {
            title,
            cls,
            tags,
            secret,
            content,
            text
        } = this.getData();
        let delImages = [];
        let uploadedImages = [];
        if (!title.trim()) {
            return this.titleEl.current.focus();
        } else if (!cls) {
            let select = document.getElementById("clsSelect");
            if (!select) return message.error("没有分类，请先添加分类!");
            return select.focus();
        } else if (!text) {
            return message.error("请输入文章内容!");
        }

        let images = this.getImages();
        this.uploadedImages.forEach(img => {
            let exists = false;
            images.forEach(item => {
                if (item === img) {
                    exists = true;
                    uploadedImages.push(img);
                }

            });
            if (!exists) {
                delImages.push(img);
            }
        });
        let body: any = {
            id: this.id,
            title,
            clsId: cls,
            tags,
            secret,
            content,
            summary: text.substring(0, 150),
            delImages,
            uploadedImages
        };
        this.props.saveArticle(body);
    }

    saveToDrafts = () => {
        let {
            title,
            cls,
            tags,
            secret,
            content,
            text
        } = this.getData();
        this.props.saveToDrafts({
            id: this.id,
            title,
            clsId: cls,
            tags,
            secret,
            content,
            summary: text.substring(0, 150)
        });
    }

    upload = () => {
        this.fileEl.current.click();
    }

    doUpload = async (file: File) => {
        let fd = new FormData();
        let editor = this.editorRef.current.editor;
        fd.append("attachment", file);
        fd.append("isArticle", "true");
        loading.show();
        try {
            const ret: any = await _fetch(UPLOAD_FILE, {
                method: "post",
                body: fd
            });
            editor.insertEmbed(editor.getText().length, "image", ret.url);
            this.uploadedImages.push(ret.url);
        } catch (error) { }
        loading.hide();
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
            state: {
                title,
                cls,
                secret,
                tags,
                error,
                message,
                backUrl
            },
            props: { saved },
            id,
            isDraft
        } = this;

        if (error) {
            return <NoArticle message={message} />
        }

        return (
            <section className="article-edit-wrapper">
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
                <div className="row text-right action-btns">
                    {
                        id && !isDraft ? null : (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={this.saveToDrafts}>保存到草稿箱</Button>
                        )
                    }
                    <Button
                        variant="contained"
                        onClick={this.save}
                        color="primary">保存</Button>
                    <Link to={ backUrl || `/xsys/articles}`}>
                        <Button
                            className="ml-10"
                            variant="contained"
                            color="secondary">取消</Button>
                    </Link>
                </div>
            </section>
        );
    }
}