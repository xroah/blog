const fontSizeStyle = Quill.import("attributors/style/size");
const fonts = Quill.import("formats/font");
fontSizeStyle.whitelist = ["12px", false, "16px", "18px", "20px", "24px", "36px"];
fonts.whitelist = ["Microsoft YaHei", "SimSun", "SimHei", "KaiTi", "FangSong", "Arial", "sans-serif", "Times-New-Roman"];
Quill.register(fontSizeStyle, true);
Quill.register(fonts, true);

const toolbarOptions = [
    [{ "size": fontSizeStyle.whitelist }],  // custom dropdown
    [{ "font": fonts.whitelist }],
    [{ "header": [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],        // toggled buttons
    [{ "align": null }, { "align": "center" }, { "align": "right" }, { "align": "justify" }],
    ["blockquote", "code-block"],
    [{ "list": "ordered" }, { "list": "bullet" }],

    [{ "color": [] }, { "background": [] }],
    ["link", "image"]
];

const editor = new Quill("#editor", {
    modules: {
        toolbar: toolbarOptions
    },
    theme: "snow"
});

const toolbar = editor.getModule("toolbar");
toolbar.addHandler("image", function () {
    console.log("upload images")
});

export default toolbar;