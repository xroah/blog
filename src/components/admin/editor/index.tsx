import * as React from "react";
import Quill from "quill";
import classnames from "classnames";
import "./index.scss";

interface Props extends React.HTMLAttributes<any> {
    onUpload?: () => void;
}

export default class Editor extends React.Component<Props> {

    toolbar: HTMLElement;
    textArea: HTMLElement;
    editor: Quill;

    componentDidMount() {
        const fontAttributor = Quill.import("attributors/class/font");
        fontAttributor.whitelist = ["arial", "simsun", "yahei", "consolas"];
        const sizeAttributor = Quill.import("attributors/class/size");
        sizeAttributor.whitelist = [
            "f12",
            "f14",
            "f16",
            "f18",
            "f20",
            "f24",
            "f28",
            "f32"
        ];
        Quill.register(fontAttributor, true);
        Quill.register(sizeAttributor, true);
        this.editor = new Quill(this.textArea, {
            modules: {
                toolbar: this.toolbar
            },
            theme: "snow"
        });
        this.editor.getModule("toolbar").addHandler("image", this.handleImage);
    }

    handleImage = () => {
        let { onUpload } = this.props;
        if (typeof onUpload === "function") {
            onUpload();
        }
    }

    setColors(second: string = "#000000") {
        return [
            "",
            second,
            "#e60000",
            "#ff9900",
            "#ffff00",
            "#008a00",
            "#0066cc",
            "#9933ff",
            "#facccc",
            "#ffebcc",
            "#ffffcc",
            "#cce8cc",
            "#cce0f5",
            "#ebd6ff",
            "#bbbbbb",
            "#f06666",
            "#ffc266",
            "#ffff66",
            "#66b966",
            "#66a3e0",
            "#c285ff",
            "#888888",
            "#a10000",
            "#b26b00",
            "#b2b200",
            "#006100",
            "#0047b2",
            "#6b24b2",
            "#444444",
            "#5c0000",
            "#663d00",
            "#666600",
            "#003700",
            "#002966",
            "#3d1466"
        ].map((color: string) => <option value={color} key={color}></option>);
    }

    render() {
        let { className, onUpload, ...otherProps } = this.props;
        className = classnames(className, ".editor-wrapper");
        return (
            <div className={className}  {...otherProps}>
                <div ref={el => this.toolbar = el}>
                    <select className="ql-size" defaultValue="">
                        <option value="f12">12px</option>
                        <option value="">默认大小</option>
                        <option value="f16">16px</option>
                        <option value="f18">18px</option>
                        <option value="f20">20px</option>
                        <option value="f24">24px</option>
                        <option value="f28">28px</option>
                        <option value="f32">32px</option>
                    </select>
                    <select className="ql-font" defaultValue="serif">
                        <option value="serif">sans serif</option>
                        <option value="arial">Arial</option>
                        <option value="consolas">Consolas</option>
                        <option value="yahei">微软雅黑</option>
                        <option value="simsun">宋体</option>
                    </select>
                    <button className="ql-bold"></button>
                    <button className="ql-italic"></button>
                    <button className="ql-underline"></button>
                    <button className="ql-strike"></button>
                    <button className="ql-align"></button>
                    <button className="ql-align" value="center"></button>
                    <button className="ql-align" value="right"></button>
                    <button className="ql-align" value="justify"></button>
                    <select className="ql-header" defaultValue="">
                        <option value="">默认标题</option>
                        <option value="1">标题1</option>
                        <option value="2">标题2</option>
                        <option value="3">标题3</option>
                        <option value="4">标题4</option>
                        <option value="5">标题5</option>
                        <option value="6">标题6</option>
                    </select>
                    <button className="ql-list" value="ordered"></button>
                    <button className="ql-list" value="bullet"></button>
                    <button className="ql-code-block"></button>
                    <select className="ql-color" defaultValue="#000000">
                        {this.setColors("#ffffff")}
                    </select>
                    <select className="ql-background" defaultValue="#ffffff">
                        {this.setColors()}
                    </select>
                    <button className="ql-script" value="sub"></button>
                    <button className="ql-script" value="super"></button>
                    <button className="ql-link"></button>
                    <button className="ql-image"></button>
                </div>
                <div ref={el => this.textArea = el}></div>
            </div>
        );
    }
}