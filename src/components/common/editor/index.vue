<template>
    <div class="content-editor">
        <div ref="toolbar">
            <select class="ql-size">
                <option value="f12">12px</option>
                <option selected>默认大小</option>
                <option value="f16">16px</option>
                <option value="f18">18px</option>
                <option value="f20">20px</option>
                <option value="f24">24px</option>
                <option value="f28">28px</option>
                <option value="f32">32px</option>
            </select>
            <select class="ql-font">
                <option selectd></option>
                <option value="serif"></option>
                <option value="arial">Arial</option>
                <option value="consolas">Consolas</option>
                <option value="yahei">微软雅黑</option>
                <option value="simsun">宋体</option>
            </select>
            <button class="ql-bold"></button>
            <button class="ql-italic"></button>
            <button class="ql-underline"></button>
            <button class="ql-strike"></button>
            <button class="ql-align"></button>
            <button class="ql-align" value="center"></button>
            <button class="ql-align" value="right"></button>
            <button class="ql-align" value="justify"></button>
            <select class="ql-header">
                <option selected="selected">默认标题</option>
                <option value="1">标题1</option>
                <option value="2">标题2</option>
                <option value="3">标题3</option>
                <option value="4">标题4</option>
                <option value="5">标题5</option>
                <option value="6">标题6</option>
            </select>
            <button class="ql-list" value="ordered"></button>
            <button class="ql-list" value="bullet"></button>
            <button class="ql-code-block"></button>
            <select class="ql-color">
                <option selected></option>
                <option value="#e60000"></option>
                <option value="#ff9900"></option>
                <option value="#ffff00"></option>
                <option value="#008a00"></option>
                <option value="#0066cc"></option>
                <option value="#9933ff"></option>
                <option value="#ffffff"></option>
                <option value="#facccc"></option>
                <option value="#ffebcc"></option>
                <option value="#ffffcc"></option>
                <option value="#cce8cc"></option>
                <option value="#cce0f5"></option>
                <option value="#ebd6ff"></option>
                <option value="#bbbbbb"></option>
                <option value="#f06666"></option>
                <option value="#ffc266"></option>
                <option value="#ffff66"></option>
                <option value="#66b966"></option>
                <option value="#66a3e0"></option>
                <option value="#c285ff"></option>
                <option value="#888888"></option>
                <option value="#a10000"></option>
                <option value="#b26b00"></option>
                <option value="#b2b200"></option>
                <option value="#006100"></option>
                <option value="#0047b2"></option>
                <option value="#6b24b2"></option>
                <option value="#444444"></option>
                <option value="#5c0000"></option>
                <option value="#663d00"></option>
                <option value="#666600"></option>
                <option value="#003700"></option>
                <option value="#002966"></option>
                <option value="#3d1466"></option>
            </select>
            <select class="ql-background">
                <option value="#000000"></option>
                <option value="#e60000"></option>
                <option value="#ff9900"></option>
                <option value="#ffff00"></option>
                <option value="#008a00"></option>
                <option value="#0066cc"></option>
                <option value="#9933ff"></option>
                <option selected="selected"></option>
                <option value="#facccc"></option>
                <option value="#ffebcc"></option>
                <option value="#ffffcc"></option>
                <option value="#cce8cc"></option>
                <option value="#cce0f5"></option>
                <option value="#ebd6ff"></option>
                <option value="#bbbbbb"></option>
                <option value="#f06666"></option>
                <option value="#ffc266"></option>
                <option value="#ffff66"></option>
                <option value="#66b966"></option>
                <option value="#66a3e0"></option>
                <option value="#c285ff"></option>
                <option value="#888888"></option>
                <option value="#a10000"></option>
                <option value="#b26b00"></option>
                <option value="#b2b200"></option>
                <option value="#006100"></option>
                <option value="#0047b2"></option>
                <option value="#6b24b2"></option>
                <option value="#444444"></option>
                <option value="#5c0000"></option>
                <option value="#663d00"></option>
                <option value="#666600"></option>
                <option value="#003700"></option>
                <option value="#002966"></option>
                <option value="#3d1466"></option>
            </select>
            <button class="ql-script" value="sub"></button>
            <button class="ql-script" value="super"></button>
            <button class="ql-link"></button>
            <button class="ql-image"></button>
        </div>
        <div ref="editor"></div>
    </div>
</template>

<script>
import Quill from "quill";

export default {
    mounted() {
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
        this.editor = new Quill(this.$refs.editor, {
            modules: {
                toolbar: this.$refs.toolbar
            },
            theme: "snow"
        });
    }
};
</script>

