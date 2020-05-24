import editor from "./modules/quill-editor.js";
import emulateTransitionEnd from "./modules/utils/emulateTransitionEnd.js";
import reflow from "./modules/utils/reflow.js";
import message from "./modules/message.js";
import { UPLOAD_IMAGE, ARTICLE } from "./modules/api.js";
import request from "./modules/request.js";
import loading from "./modules/loading.js";
import getSearchParams from "./modules/utils/getSearchParams.js";
import "./modules/404.js";

window.editor = editor;

function setLayerVisible(visible) {
    const el = document.querySelector(".upload-image-wrapper");

    if (visible) {
        el.style.display = "flex";

        reflow(el);
        el.classList.add("show");
    } else {
        el.classList.remove("show");
        emulateTransitionEnd(el, () => {
            el.style.display = "none";

            resetUpload();
        });
    }
}

function resetUpload() {
    const wrapper = document.querySelector(".upload-image-wrapper .preview");

    document.getElementById("pickImage").value = "";
    wrapper.classList.remove("view");;

}

function handleFileChange(evt) {
    const target = evt.target;
    const file = target.files[0];
    const viewer = document.getElementById("imgViewer");
    const wrapper = viewer.parentNode;

    if (file) {
        const size = file.size / (1024 * 1024);//MB

        if (size > 5) {
            message.destroy();

            return message.error("图片最大5MB");
        }

        const fr = new FileReader();

        fr.readAsDataURL(file);
        fr.onload = () => {
            viewer.src = fr.result;
            wrapper.classList.add("view");
        }
    } else {
        wrapper.classList.remove("view");
    }
}

function updateProgress(value) {
    const wrapper = document.querySelector(".progress-wrapper");
    const progress = wrapper.querySelector(".progress-bar");

    if (getComputedStyle(wrapper) === "none") {
        wrapper.style.display = "flex";
    }

    progress.style.width = `${value}%`;
}

function hideProgress() {
    document.querySelector(".progress-wrapper").style.display = "none";
}

function insertImage(url) {
    const length = editor.getLength();

    editor.insertEmbed(length, "image", url);
}

function error(msg) {
    message.destroy();
    message.error(msg);
}

function upload() {
    const fileEl = document.getElementById("pickImage");
    const file = fileEl.files[0];
    const token = localStorage.getItem("token");

    if (!file) {
        return error("请选择文件");
    }

    const xhr = new XMLHttpRequest();
    const fd = new FormData();

    xhr.responseType = "json";
    xhr.onreadystatechange = () => {
        const res = xhr.response || {};

        message.destroy();

        if (xhr.readyState === 4) {
            if (xhr.status === 200 && res.code === 0) {
                message.success("上传成功");
                setLayerVisible(false);
                insertImage(res.data.url);
            } else {
                error(res.msg ||xhr.statusText || "上传失败");
            }

            hideProgress();
        }
    }
    xhr.onerror = xhr.ontimeout = () => {
        error("上传失败");
        hideProgress();
    }
    xhr.upload.onprogress = evt => {
        const total = evt.total;
        const loaded = evt.loaded;
        const progress = loaded / total;

        updateProgress(progress);
    }

    fd.append("articleImage", file);

    xhr.open("POST", UPLOAD_IMAGE, true);
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.setRequestHeader("Authorization", `token ${token}`);
    xhr.send(fd);
}

function getImages() {
    const content = editor.getContents();
    const ret = [];

    for (let obj of content.ops) {
        const tmp = obj.insert;

        if (tmp.hasOwnProperty("image")) {
            const PREFIX = "/uploads/";
            const src = tmp.image.split(PREFIX)[1];

            if (src) {
                ret.push(PREFIX + src);
            }
        }
    }

    return ret;
}

async function save(evt) {
    const titleEl = document.getElementById("title");
    const tagEl = document.getElementById("tag");
    const content = editor.getText().trim();
    const contentHTML = editor.scrollingContainer.innerHTML;
    const secret = document.getElementById("secret").checked;
    const title = titleEl.value;
    const category = document.getElementById("category").value;
    const tag = tagEl.value;
    const saveBtn = document.getElementById("save");
    let errorMsg;
    let focusEl;

    if (!title) {
        errorMsg = "请输入文章标题";
        focusEl = titleEl;
    } else if (!content) {
        errorMsg = "请输入文章内容";
        focusEl = editor;
    }

    if (errorMsg) {
        if (evt) { //click save button
            error(errorMsg);
            focusEl.focus();
        }

        return;
    }

    loading.show();
    saveBtn.disabled = true;

    try {
        await request(ARTICLE, {
            method: "POST",
            body: JSON.stringify({
                secret,
                title,
                tag,
                content: contentHTML,
                summary: editor.getText().substring(0, 101),
                category,
                images: getImages(),
                articleId: getSearchParams("articleId")
            })
        });
    } catch (err) {
        saveBtn.disabled = false;

        return;
    } finally {
        loading.hide();
    }

    message.success("保存成功");
    setTimeout(() => location.assign("./index.html"), 500);
}

function initEvent() {
    const toolbar = editor.getModule("toolbar");
    const closeBtn = document.querySelector(".upload-image-wrapper .close-preview");
    const fileInput = document.getElementById("pickImage");
    const uploadBtn = document.getElementById("upload");
    const saveBtn = document.getElementById("save");

    toolbar.addHandler("image", () => setLayerVisible(true));
    closeBtn.addEventListener("click", () => setLayerVisible(false));
    fileInput.addEventListener("change", handleFileChange);
    uploadBtn.addEventListener("click", upload);
    saveBtn.addEventListener("click", save);
}

function initEdit(data) {
    console.log(data)
    editor.scrollingContainer.innerHTML = data.content;
    document.getElementById("title").value = data.title;
    document.getElementById("tag").value = (data.tag || []).join(";");
    document.getElementById("secret").checked = !!data.secret;

    initEvent();
}

function set404() {
    const con = document.querySelector(".container");

    con.innerHTML = '<not-found>文章不存在</not-found>';
}

async function fetchArticle(id) {
    let ret;

    loading.show();

    try {
        ret = await request(`${ARTICLE}?articleId=${id}`);        
    } catch (err) {
        return set404();
    } finally {
        loading.hide();
    }

    initEdit(ret);
}

function init() {
    if (location.search.includes("articleId")) {
        fetchArticle(getSearchParams("articleId"));
    } else {
        initEvent();
    }
}

init();