import * as React from "react";
import Editor from "../editor";
import { Button } from "@material-ui/core";
import "./index.scss";

export default class ArticleEdit extends React.Component {

    state = {
        title: "",
        cls: ""
    };

    render() {
        return (
            <section className="article-edit-wrapper">
                <div className="row">
                    <span className="label-text">文章标题:</span>
                    <input
                        type="text"
                        maxLength={20}
                        className="form-control form-item" />
                </div>
                <div className="row">
                    <span className="label-text">文章分类:</span>
                    <select
                        defaultValue=""
                        className="form-control form-item">
                        <option value="">请选择</option>
                        <option value="1">Javascript</option>
                        <option value="2">CSS</option>
                    </select>
                </div>
                <div className="row">
                    <span className="label-text">标签:</span>
                    <input
                        type="text"
                        placeholder="以半角英文分号分隔"
                        className="form-control form-item" />
                </div>
                <div className="row">
                    <span className="label-text align-top">文章内容</span>
                    <Editor className="form-item" />
                </div>
                <div className="row text-right">
                    <Button
                        variant="contained"
                        color="primary">
                        保存
                    </Button>
                    <Button
                        style={{ marginLeft: 10 }}
                        className="ml-10"
                        variant="contained">
                        取消
                    </Button>
                </div>
            </section>
        );
    }
}