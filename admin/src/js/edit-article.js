import "../vendors/js/quill.min.js";
import editor from "./modules/quill-editor.js";
import message from "./modules/message.js";
import { ARTICLE, CATEGORY } from "./modules/api.js";
import request from "./modules/request.js";
import loading from "./modules/loading.js";
import getSearchParams from "./modules/utils/getUrlParams.js";
import "./modules/nav.js";
import "./modules/404.js";
import dialog from "./modules/dialog.js";
import upload from "./modules/utils/upload.js";
import "./modules/layer.js";

let saved = true;

function setLayerVisible(visible) {
    const layer = document.querySelector("layer-comp");
    
    layer.setVisible(visible, null, resetUpload);
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
            target.value = "";

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

    if (getComputedStyle(wrapper).getPropertyValue("display") === "none") {
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

async function uploadImage() {
    const fileEl = document.getElementById("pickImage");
    const file = fileEl.files[0];
    let ret;

    if (!file) {
        return error("请选择文件");
    }

    try {
        ret = await upload(file, updateProgress);
    } catch (e) {
        return error(e || "上传失败");
    } finally {
        hideProgress();
    }

    setLayerVisible(false);
    insertImage(ret);
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

function cancelAutoSave() {
    if (autoSave.timer != undefined) {
        clearTimeout(autoSave.timer);
        autoSave.timer = null;
    }

    if (autoSave.abortCtrl) {
        autoSave.abortCtrl.abort();
        autoSave.abortCtrl = null;
    }
}

function autoSave() {
    saved = false;
    cancelAutoSave();

    const _save = async () => {
        const abortCtrl = new AbortController();
        const aIdEl = document.getElementById("articleId");

        autoSave.abortCtrl = abortCtrl;

        try {
            const ret = await saveRequest(true, abortCtrl.signal);

            aIdEl.value = ret._id;

            message.destroy();
            message.success("自动保存成功");
        } catch (error) {

        } finally {
            autoSave.abortCtrl = null;
            autoSave.timer = null;
        }
    }

    autoSave.timer = setTimeout(_save, 3000);
}

async function saveRequest(draft, signal) {
    const secret = document.getElementById("secret").checked;
    const title = document.getElementById("title").value;
    const category = document.getElementById("category").value;
    const tag = document.getElementById("tag").value;
    const aIdEl = document.getElementById("articleId");

    return request(ARTICLE, {
        method: "POST",
        signal,
        body: JSON.stringify({
            secret,
            title,
            tag,
            content: editor.scrollingContainer.innerHTML,
            summary: editor.getText().substring(0, 151),
            categoryId: category,
            images: getImages(),
            draft,
            articleId: aIdEl.value
        })
    });
}

async function save() {
    const titleEl = document.getElementById("title");
    const content = editor.getText().trim();
    const title = titleEl.value;
    const categoryEl = document.getElementById("category");
    const category = categoryEl.value;
    const saveBtn = document.getElementById("save");
    let errorMsg;
    let focusEl;

    cancelAutoSave();

    if (!title) {
        errorMsg = "请输入文章标题";
        focusEl = titleEl;
    } else if (!category) {
        errorMsg = "请选择分类";
        focusEl = categoryEl;
    } else if (!content) {
        errorMsg = "请输入文章内容";
        focusEl = editor;
    }

    if (errorMsg) {
        error(errorMsg);
        focusEl.focus();

        return;
    }

    loading.show();
    saveBtn.disabled = true;

    try {
        await saveRequest();
    } catch (err) {
        saveBtn.disabled = false;

        return;
    } finally {
        loading.hide();
    }

    saved = true;

    dialog.confirm("保存成功，是否要继续写文章？", {
        onOk() {
            window.location.href = "/edit-article.html";
        },
        onCancel() {
            if (window.opener) {
                window.opener.location.href = "/";
            }

            window.close();
        }
    });
}

function initEvents() {
    const toolbar = editor.getModule("toolbar");
    const fileInput = document.getElementById("pickImage");
    const uploadBtn = document.getElementById("upload");
    const saveBtn = document.getElementById("save");
    const title = document.getElementById("title");
    const tag = document.getElementById("tag");
    const secret = document.getElementById("secret");
    const category = document.getElementById("category");

    toolbar.addHandler("image", () => setLayerVisible(true));
    fileInput.addEventListener("change", handleFileChange);
    uploadBtn.addEventListener("click", uploadImage);
    saveBtn.addEventListener("click", save);
    editor.on("text-change", autoSave);
    [
        title,
        tag,
        secret,
        category
    ].forEach(el => el.addEventListener("change", autoSave));
    window.addEventListener("beforeunload", e => {
        if (!saved) {
            e.preventDefault();
            e.returnValue = "";
        }
    });
}

function initEdit(data) {
    document.getElementById("category").value = data.categoryId || "";
    editor.scrollingContainer.innerHTML = data.content;
    document.getElementById("title").value = data.title;
    document.getElementById("tag").value = (data.tag || []).join(";");
    document.getElementById("secret").checked = !!data.secret;
}

function set404() {
    const con = document.querySelector(".container");

    con.innerHTML = `<not-found>文章不存在</not-found>`;
}

function initCategory(res) {
    const select = document.getElementById("category");
    const frag = document.createDocumentFragment();

    select.innerHTML = "";

    frag.appendChild(new Option("请选择分类", ""));

    for (let c of res) {
        const option = new Option(c.name, c._id);

        frag.appendChild(option);
    }

    select.appendChild(frag);
}

async function fetchArticle(id) {
    let ret;
    let category;

    loading.show();
    message.destroy();

    try {
        const promises = [request(CATEGORY)];

        if (id) {
            id = id.trim();

            promises.push(request(`${ARTICLE}?articleId=${id}`));
        }

        [category, ret] = await Promise.all(promises);
    } catch (err) {
        err && err.code === 404 && set404();

        return;
    } finally {
        loading.hide();
    }

    initCategory(category);
    ret && initEdit(ret);
}

async function init() {
    const articleId = getSearchParams("articleId") || "";
    await fetchArticle(document.getElementById("articleId").value = articleId);
    initEvents();
}

init();