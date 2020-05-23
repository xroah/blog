import editor from "./modules/quill-editor.js";
import emulateTransitionEnd from "./modules/utils/emulateTransitionEnd.js";
import reflow from "./modules/utils/reflow.js";
import message from "./modules/message.js";
import { UPLOAD_IMAGE } from "./modules/api.js";

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

function upload() {
    const fileEl = document.getElementById("pickImage");
    const file = fileEl.files[0];
    const token = localStorage.getItem("token");

    if (!file) {
        message.destroy();

        return message.error("请选择文件");
    }

    const xhr = new XMLHttpRequest();
    const fd = new FormData();

    xhr.responseType = "json";
    xhr.onload = () => {
        const res = xhr.response;

        message.destroy();

        if (res.code === 0) {
            message.success("上传成功");
            setTimeout(() => {
                setLayerVisible(false);
                insertImage(res.data.url);
            }, 1000);
        } else {
            message.error(res.msg || "上传失败");
        }

        hideProgress();
    }
    xhr.onerror = xhr.ontimeout = () => {
        message.destroy();
        message.error("上传失败");
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

function initEvent() {
    const toolbar = editor.getModule("toolbar");
    const closeBtn = document.querySelector(".upload-image-wrapper .close-preview");
    const fileInput = document.getElementById("pickImage");
    const uploadBtn = document.getElementById("upload");

    toolbar.addHandler("image", () => setLayerVisible(true));
    closeBtn.addEventListener("click", () => setLayerVisible(false));
    fileInput.addEventListener("change", handleFileChange);
    uploadBtn.addEventListener("click", upload);
}
function init() {
    initEvent()
}

init();